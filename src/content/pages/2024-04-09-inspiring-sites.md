---
title: "Personal websites inspiration and notes"
date: "2024-04-09"
description: "List of sites I like, and notes on what makes them memorable"
---

- <https://anhvn.com/> Has beautiful art, sorta like a comic strip?
- <https://skip.house/> Love the 2005 internet vibe, attention to detail with type, silk icons and color.
- <https://versary.town/> Incredibly chaotic, a bit more retro than skip's site. Only dislike is cursors can be a bit jarring.
- <https://neonaut.neocities.org/> Each page has a unique theme, also has a sorta chaotic retro vibe. Not as much as annie's site tho.
- <https://breq.dev/> Goes in a completely opposite direction to the retro sites and incorporates 3D animation.
- <https://freeplay.floof.company/> Full of completely no-js interactive features.
- <https://rsms.me> I took a lot of inspiration from Rasmus's site in my own. Namely A links using backgrounds and arrows denoting links.

Some stuff I like about my own site:

- Certain pages such as [my train icons showcase](/things/trains) and [twitter embeds bot](https://adryd.com/things/twitter-embeds/) have modified themes. The twitter embeds bot page also has a border similar to the icon of the bot.
- The 404 page has some cute witchy artwork

What makes a site memorable:

- Unique and personal touches
- Interactivity

Some guidelines for creating sites (not necessarily personal sites):
\_sorta a modern version of <https://github.com/adryd325/ethical-web-design-practices>

- If you must display banners or popups make sure they don't obstruct content and are easy to dismiss.
  - Popups for a newsletter are annoying, keep them as a banner.
  - Do not force sign-ups or login to view content, if you must prompt logins, use a banner.
  - Cookie popups banners be easy to dismiss or ignore with no slowdowns or additional menus.
  - [No, you don't need a cookie popup on your site](https://www.indiehackers.com/post/no-you-dont-need-a-cookie-popup-on-your-site-f932fd87ac).
- If possible, respect prefers-reduce-motion.
- Transition animations may look pretty, but often serve to slow things down, keep them quick if you must have them.
- Do not mess with scrolling smoothness or direction.
- Do not mess with the users cursor, particularly the motion of the cursor.
  - I do not want a cursor with smoothing. I do not want a dot with that smoothing following my cursor either.
  - If you chose to replace cursors, please replace them with one that has a point at the top left.
- Do not play sounds or video without the user expecting them or having the chance to disable them.
- If you choose to use analytics, keep them 1st party if possible.
- If you choose to use advertising, use unobtrusive ads. Carbon Ads seems to do this alright.
  - Ads should never pretend to be site content.
  - Do not prevent users with ad-blockers from accessing your site.
- If you choose to use advertising, try to find a privacy respecting provider.
- Respect Do Not Track.
- Javascript is fine actually. But try to use it only where needed though; and reduce bundle sizes when possible.
