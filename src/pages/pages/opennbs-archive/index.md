---
layout: "@/layouts/PagesMarkdown.astro"
title: "Archiving Minecraft note block songs from opennbs.org"
description: "How I downloaded all of the songs from opennbs.org's deleted song browser."
date: 2025-12-29
---

A few years ago I was participating in [LiveOverflow's Minecraft:HACKED](https://www.youtube.com/watch?v=Ekcseve-mOg&list=PLhixgUqwRTjwvBI-hmbZ2rpkAl4lutnJG) server. A lot of us were using Meteor Client which includes a NoteBot module that automates your player to play noteblock songs. One of the main places to download note block songs in the "nbs" file format, [opennbs.org/songs (archive link)](https://web.archive.org/web/20221031225620/https://opennbs.org/songs/), had taken down their song browser. 

I'm recounting this from 3 years ago, so my memory of what I did was fuzzy. 

I had noticed in the client JS that it was accessing a firebase database, and the logic for fetching from the database was simply commented out. [songs.js (archive link)](https://web.archive.org/web/20221031225621id_/https://opennbs.org/assets/js/songs.js)

```js
//Get all accepted songs
db.collectionGroup("songs").where("status", "==", 1).get().then(function (querySnapshot) {
  querySnapshot.forEach(function (doc) {
    var data = doc.data();
    songList.add({
      name: data.name,
      author: data.author,
      original_author: data.original_author,
      download_link: data.download_url,
      date: data.date.toDate().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      }).replace(/ /g, ' '),
      timestamp: data.date.toDate().getTime()
    });
  });
  
  //Sort songs by date
  songList.sort("timestamp", { order: "desc" });
});
```

The firebase database was still up at the time, so I got all the songs from the database and downloaded all the .nbs files.

Anyway [here's the archive](/pages/opennbs-archive/opennbs.zip) from November 19th, 2022.

Since then the OpenNBS team made a new website, [noteblock.world](https://noteblock.world/). I'm not sure whether it includes the original song database because it's not searchable; so I figured it's still worth publishing this archive. It also requires sign-in to download any of the songs which is irritating.