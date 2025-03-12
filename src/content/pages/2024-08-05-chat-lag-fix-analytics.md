---
title: "Interesting analytics for my chat-lag-fix mod"
date: "2024-08-05"
description: "I noticed something really interesting in my Modrinth analytics. One of my mods..."
---

I noticed something really interesting in my Modrinth analytics. One of my mods (https://modrinth.com/mod/chat-lag-fix) is especially popular in China when compared to my other mods.

The mod in question was a fix for a blocking HTTP request being made in the render thread upon receiving chat messages. The bug was discovered when Mojang's servers were having issues and [it was causing a significant lagspike](https://bugs.mojang.com/browse/WEB-5587) for many users

I suspect the reason my mod is still fairly popular in China is because Mojang's servers being blocked might cause this lagspike.
