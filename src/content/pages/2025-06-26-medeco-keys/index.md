---
title: 3D Printing Medeco Keys (M3)
date: 2025-06-26
draft: true
description: "temp"
---

Key control is something important to many building owners who distribute keys to employees or tennants. Key control basically means an ordinary person cant go and clone their key at a locksmith. Medeco is a lock company that prides themselves on key control; and I take that as a challenge.

## Getting the bitting

### Depths

Most lock/keys, including Medeco, have standard depths and positions of key cuts. We can use this to our advantage, as we can guestimate that certain rough measurements will fall into these standard depths.

When you have a physical key in hand, it makes sense to use a [physical decoder card](https://www.redteamtools.com/devious-decoder-card), however I don't. We can roughly approximate a physical decoder with a photo decoder. A photo decoder is a transparent image with the depths, and top and bottom of a key. One can overlay that image onto a key, and align it to find the depths.

Since I didn't have a physical copy of the key I wanted to copy, I needed a photo decoder. And since I haven't found any photo decoders online, so I made my own.

![alt text](image.png)

### Angles, and Positions

Notabily, Medeco Biaxial have 2 possible horizontal positions where a cut can be placed, The vertical lines across the keyway help one determine the "fore" or "aft" positions. For this reason, keys in my decoder need to be aligned at the shoulder.

Medeco keys also have rotational cuts with 3 possible angles. Assuming You're holding the key with the bow on top and tip on bottom, you can decode them like so: ascending left to right, no angle, and descending left to right

| Angle                        | Fore | Aft |
| ---------------------------- | ---- | --- |
| Ascending Left to Right (L)  | K    | M   |
| No Angle (C)                 | B    | D   |
| Descending Left to Right (R) | Q    | S   |

If you want some practice, the angles of the key in the above photo are visible on this page <https://ik.imagekit.io/twr9df4sfpl/dam/dam/AADSS1014173> [(Archive)](https://archive.ph/haCHk)

The bitting of the key in the above photo is 2D5M4S6D2S (Yes, all of these are Aft cuts.)

### The sidebar

Medeco M3 keys also have a sidebar, This is also pretty straight forward to decode with my visual decoder. 6 is the cut closest to the shoulder (top of the key). There is a second level of depth which is used for complex master systems. I have always seen these cut to the same position which I have called the 0 cut

## The warding

Warding is machining that ensures only keys of a certian kind can fit in a certain key hole. All pin-tumbler keys I've seen have this.

I happen to have a sacrificial key with the same warding. I sanded it down flat so that I could get a scan of it on a high resolution flatbed scanner.

![alt text](image-4.png)
![alt text](keyway.png)

I then traced the keyway in inkscape, with some tolerance.
![alt text](image-6.png)

## Putting it together

[Someone has already made a lovely OpenSCAD generator for Medeco keys.](https://github.com/ervanalb/keygen/tree/master)

Adding my keyway was simple, I used [SVG2SCAD](https://github.com/Spiritdude/SVG2SCAD) and pasted the output into "medeco.gen.scad"

I also hastily added support for the M3 sidebar

![alt text](image-2.png)
![alt text](image-3.png)

## Result
