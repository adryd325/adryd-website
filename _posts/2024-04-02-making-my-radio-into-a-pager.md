---
title: Making my radio into a two way pager
date: "2024-04-02"
layout: post
image: /static/pages/making-my-radio-into-a-pager-embed.jpg
excerpt: >-
  Something I've loved about handheld radios and old phones compared to our modern phones is their durability. I feel like I could drop my radio off a cliff and it would still work, where carrying a modern cellphone without a case feels like carrying an egg...

description: >-
  Something I've loved about handheld radios and old phones compared to our modern phones is their durability. I feel like I could drop my radio off a cliff and it would still work, where carrying a modern cellphone without a case feels like carrying an egg...

---

Something I've loved about handheld radios and old phones compared to our modern phones is their durability. I feel like I could drop my radio off a cliff and it would still work, where carrying a modern cellphone without a case feels like carrying an egg. 

<div 
  style="border-radius: 15px; overflow:hidden; line-height:0"
  ><img 
    alt="Front photo of a Motorola XPR6550. The radio features a small monochrome LCD screen and a keypad" 
    srcset="/static/pages/making-my-radio-into-a-pager-xpr6550-front-@1x.jpg, /static/pages/making-my-radio-into-a-pager-xpr6550-front-@2x.jpg 2x" 
    src="/static/pages/making-my-radio-into-a-pager-xpr6550-front-@1x.jpg"
    style="max-width: 50%"
  ><img 
    alt="Side photo of a Motorola XPR6550. Notably, the radio is bulky, about 4 centimeters thick including the battery"
    srcset="/static/pages/making-my-radio-into-a-pager-xpr6550-side-@1x.jpg, /static/pages making-my-radio-into-a-pager-xpr6550-side-@2x.jpg 2x"
    src="/static/pages/making-my-radio-into-a-pager-xpr6550-side-@1x.jpg" 
    style="max-width: 50%"
></div>

<br>
While waiting for the opportunity to buy a TETRA (TErestrial Trunked RAdio) for a larger project in the future, I bought a used Motorola XPR 6550 off ebay to play around with DMR (Digital Mobile Radio). DMR and TETRA are both digital radio protocols, allowing for more efficient use of bandwidth for voice communication, and provide additional data capabilities such as metadata, gps position, text messages and IP traffic. The XPR 6550 is one of the oldest radios from Motorola's MOTOTRBO (DMR) line, having been released around 2007 (I cannot find an exact date), and they still work wonderfully. 

I had already been interested in getting text messages working with my other DMR radio, A Retevis RT3S, however I use a custom firmware called [OpenGD77](https://opengd77.com) which does not support SMS because of implementation difficulties and fear of patents. I bought my XPR 6550 in part because of its support for SMS, and I was hoping it would work out of the box; but unfortunately that was not the case.

## How DMR SMS works

When Motorola first introduced SMS in their radios, the ETSI had not created a standard for text messaging yet, so Motorola's SMS format is proprietary. SMS messages are formatted in UTF-16BE with a short header that includes the length of the message. That payload gets encapsulated in a IPv4 UDP packet. The radios are addressed using their radio IDs: the last three octets of the IP being the radio ID, and the first octet being the "CAI" or Network ID (usually 12); and the UDP port is by default 4007.

I haven't figured out how data ACK packets work, however the output of [DSD+](https://www.dsdplus.com/) when intercepting traffic shows an ICMP network unreachable error? I'll have to play with this a bit more.

ETSI's standard text messaging is quite similar to Motorola's protocol, however It drops the proprietary header and uses the default port of 5016.

The UDP IP packets are appended with a CRC and encapsulated in an error correction layer (which I do not understand, time to re-watch [Ben Eater's explainer video](https://www.youtube.com/watch?v=h0jloehRKas)). Depending on the type of packet, Different error correction algorithms are used. Notably the "Data Call Confirm" option on the radio changes the error correction algorithm from "1/2 Rate" to "3/4 Rate (Trellis)".

## Getting my radio to speak SMS

To start off on the base station side of things, I wanted to create my own DMR network. Having full control of the infrastructure was important to me, as it would allow me to have full control of the network and be able to debug when things went wrong. I have a [MMDVM modem](https://github.com/phl0/MMDVM_HS_Dual_Hat) with a Raspberry Pi acting as the base station hardware. On the Raspberry Pi, I have an image with [MMDVMHost](https://github.com/g4klx/MMDVMHost) installed, and configured to point to my local DMR server.

I'm using a pre-built image with MMDVMHost pre-installed, however I plan to move to using MMDVMHost on plain raspbian in the future, since the helper software in the image interferes with hosting other services on the same Pi. 

I chose to build off of [HBnet](https://github.com/kf7eel/hbnet). An open source DMR "master" server that supports connecting to MMDVMHost. HBnet already had some support for Motorola's DMR SMS, however it had the wrong port and a different header format than I observed while decoding messages sent from my own radio. Unfortunately HBnet's data service is a cluttered mess of many components that should be split off and was difficult to work within that codebase. This would work fine for a proof of concept and to debug why I was having problems sending and receiving text messages on my radio.

The radio configuration took me the longest to figure out, because I had assumed I had done it right the first time. I was making tons of tweaks to HBnet in hopes I could get it to parse a message. The first issue I found was that my radio was sending "3/4 Rate data" or "trellis" as the error correction protocol. HBnet doesn't support 3/4 rate data, so I had to figure out how to get it to use 1/2 rate data. I had assumed at first that 1/2 rate data was a newer feature, but after some fiddling I found that disabling "Data Call Confirm" was the solution to my problem for my radio. Confirmed data appears to use a slightly different header format as well for the FEC layer (See ETSI TS 102 361-3 section 5.3 and 5.4 if you're interested in details).

After that, I had problems getting my radio to receive messages. The solution there was to disable Network PC forwarding. I only found this option when I was playing with some third party software that connects to the radio to act as a SMS service. After changing a few things in HBnet (UDP Destination port and a slight change to a header); My radio was receiving SMS messages just fine

Changing all those settings fixed my issues with Brandmeister's (A large DMR network for ham radio operators) SMS services. It was a config issue all along!

HBnet's data service was already doing tons more than just parsing SMS and was incredibly cluttered and annoying to work with. For that reason I chose to just add an HTTP server to HBnet and deal with processing communication with Discord in a separate program. Nothing fancy

### XPR 6550 Data Settings

Global settings:
- General Settings -> TX Preamble Duration (ms): 1020 (radio wake up preamble, only needs to be high if you plan on using scan lists. This could probably be set even lower, and should be set as low as possible on amateur networks to avoid congestion, as it hogs the channel sending garbage that entire duration)
- Network -> CAI Network: 12 
- Network -> Forward to PC: Disabled (when this is enabled, all packets are forwarded over usb, completely disabling text message parsing on the radio)
- Network -> TMS Radio ID: (Consult your network, 9099 for HBnet)
- Network -> TMS UDP Port: 4007 

Channel Settings
- IP Site Connect shouldn't matter
- Compressed UDP Data Header: None
- Admit Criteria: Color Code Free (This is important, as the channel free option can read a high noise floor as a channel being busy)
- In Call Criteria: Follow Admit Criteria 
- Private Call Confirmed: False 
- Data Call Confirmed: False (when this is true, data is sent in 3/4 rate funny and HBnet does not support decoding it)

## Demo and Closing thoughts

<video style="max-width: 100%; border-radius: 15px" controls>
  <source src="/static/pages/making-my-radio-into-a-pager-demo.mp4" type="video/mp4">
</video>
<br>
Right now this setup is incredibly clunky. Ideally in the future I would write a new DMR server soley for handling SMS, as HBnet is very cluttered. A drop in component for DMR servers for handling APRS, Bridging to DAPNET and other text message and data services would be an ideal future goal. Perhaps I'll consult with Brandmeister to get an ID assigned for my text message service, and build upon it to allow others to use it.

Perhaps a fun future exploration in playing with DMR would be to [use the protocol to carry general IP traffic.](https://www.youtube.com/watch?v=Rs6NRC6L3xw) A friend and I have joked about making BGP announcements over DMR, or attempting to play [Minecraft using RakNet](https://modrinth.com/plugin/raknetify) over DMR. The easiest way to do this would be to buy a second Motorola radio and use their USB ethernet driver to connect two computers, but I think it would be more fun to try implement a network interface using the Home Brew DMR protocol. 

All these fun ideas aside, I'm about to resume a larger project to jailbreak a TETRA radio now that the radio has been shipped. A group of friends have been researching the firmware on the radio (It runs Linux!) and are planning to exploit CVE-2022-26941 to get a shell and see what we can do.

### Acknowledgements

Jonathan Naylor (G4KLX): Writing and maintaining MMDVMHost.<br>
KF7EEL: Writing HBnet's data gateway service.<br>
HBlink: The open source DMR server that HBnet is based on.<br>

