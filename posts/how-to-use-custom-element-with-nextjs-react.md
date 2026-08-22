---
date: "2021-09-07T19:12:00.000Z"
tag:
  - React
  - NextJs
author: Dung Huynh
hero_image: /IT Man Main Logo 800x600.png
title: How to use custom element with NextJS/React
description: "Embed YouTube with lite-youtube-embed in Next.js — disable SSR and handle React's unknown custom element"
---

## Context

When you embed YouTube's default player, the page loads heavy JS and CSS. `lite-youtube-embed` gives you a lighter custom element instead. React doesn't recognize custom elements out of the box, so you need `@ts-expect-error` on the tag and a dynamic import with SSR turned off.

## Usage

**Create `YoutubeVideo.tsx`:**

```tsx
import "lite-youtube-embed/src/lite-yt-embed.css";
import "lite-youtube-embed/src/lite-yt-embed.js";

const YoutubeVideo = ({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) => (
  // @ts-expect-error custom element
  <lite-youtube videoid={videoId}>
    <button type="button" className="lty-playbtn">
      <span className="lyt-visually-hidden">{title}</span>
    </button>
  </lite-youtube>
);

export default YoutubeVideo;
```

**Dynamic import (disable SSR):**

```tsx
import dynamic from 'next/dynamic'

const YoutubeVideo = dynamic(() => import('./YoutubeVideo'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
})

<YoutubeVideo videoId={post.youtube_id} title={post.title} />
```
