---
layout: ../../../layouts/PagesMarkdown.astro
title: "3D Printing Medeco M3 Keys"
description: '3d printing "high security" medeco m3 keys'
coverImage: "./_keyway.png"
unlisted: true
date: "2025-12-01"
---

INSERT ~~INTRODUCTION~~ DUBSTEP FILL HERE

## Medeco

Key control is an attempt by a manufacturer to prevent "unauthorized" replication of a key. It's usually meant to prevent someone from making copies of their work keys before they get fired.

Medeco's primary selling point is key control. Medeco M3 implements a few measures to prevent against key copying:
 1. They restrict who can buy blank keys to authorized locksmiths and those locksmiths may only cut keys to the terms of their contract.
 2. They use angle cuts on their keys that require a more advanced key cutting machine to produce.
 3. They use a sidebar which is pre-cut from the factory and unique to a locksmith within a given region to prevent one locksmith from cutting keys issued by another locksmith.
 4. They hold a patent on parts of the key design making it difficult for a legitimate manufacturer such as [Ilco](https://www.ilco.us/products/residential-and-commercial-key-blanks) to make. The patent for Medeco M3 expired in 2022.

## Glossary

- **bow** -- _the top of the key. the part that you hold and turn_
- **shoulder** -- _the alignment mechanism for a key. when you insert a key fully into a lock, this is the part that stops it from going in further_
- **blade** -- _the part of the key that's inserted into the lock_
- **bitting** -- _the depth and position of the cuts into the key's blade_
- **depths** -- _the depth of the cuts into the key's blade_
- **sidebar** -- _an element on the side of the key blade, often to add complexity to lockpicking or key cloning_
- **warding** -- _the shape of the key hole. prevents you from putting the type of keys into a lock_
- **keyway** -- _the shape the key blade has to be to fit through the warding_
- **key control** -- _an attempt by a manufacturer to make it so that only "authorized individuals" can copy a key_
- **m3** -- _a generation of medeco key control technology. this is one we're working with today_
- **meow** -- _the sound a cat makes_

## Constraints

## Depths and Postions

## Sidebar

## Angles

| Angle                        | Fore | Aft |
| ---------------------------- | ---- | --- |
| Ascending Left to Right (L)  | K    | M   |
| No Angle (C)                 | B    | D   |
| Descending Left to Right (R) | Q    | S   |

## Warding

Using a sacrificial key of the same bitting, I ground the key flat on a bench grinder and then placed it on a flatbed scanner. I took a scan at 1200 DPI, then cropped that image and imported it into inkscape where I traced the shape of the keyway. 

I was careful to include a little bit of tolerance as I can't be sure if there were any distortions while scanning, and I want to make sure there's room for error in the 3D printing process.

![A photo of a key, with the blade ground off, held down onto a flatbed scanner with an adjustable wrench](_image-4.png)
<figure>A photo of a key, with the blade ground off, held down onto a flatbed scanner with an adjustable wrench</figure>

![A screenshot of inkscape. There is red shape in the shape of the warding traced uppon a scan of the key](_image-5.png)<figure>A screenshot of inkscape. There is red shape in the shape of the warding traced uppon a scan of the key</figure>

## Table of Contents

- introduction : How

- introduce key control

  - only authorized individuals can cut a key
  - landlords use this, sometimes to be shitty

- medeco does key control in 3 ways

  1. Controling the blanks
  2. Angle cuts requiring a special machine to cut
  3. Pre-cut sidebar groove on the key

- okay, let's get around this
- introduce the parameters: i'm making this for a friend and don't have physical access to the key
- bitting and positions
  - photo decoder
  - didnt exist before, so i made one
  - horizontal lines are depth
  - vertical lines are position
  - did i mention fore and aft cuts
- sidebar
  - this one's easy just look at the decoder i made :\)
- angles
  - can't be too hard right
- warding
  - grind the key down on a bench grinder
  - scan it on a flatbed scanner
  - inkscape!
- putting it together
  - someone already made a great tool for 3d modeling keys
  - just need to add the keyway
  - and the m3 sidebars
- pictures of the result
