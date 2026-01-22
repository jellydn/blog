---
date: "2021-09-07T19:12:00.000Z"
tag:
  - React
  - NextJs
author: Dung Huynh
hero_image: /IT Man Main Logo 800x600.png
title: How to use custom element with NextJS/React
description: "Use lite-youtube-embed with Next.js dynamic import"
---

## Context

Embedding YouTube's default player loads heavy JS/CSS. `lite-youtube-embed` is a lightweight alternative using custom elements. React doesn't recognize custom elements, requiring `@ts-expect-error` and dynamic import with SSR disabled.

## Usage

**Create `YoutubeVideo.tsx`:**
```tsx
import 'lite-youtube-embed/src/lite-yt-embed.css'
import 'lite-youtube-embed/src/lite-yt-embed.js'

const YoutubeVideo = ({ videoId, title }: { videoId: string; title: string }) => (
  // @ts-expect-error custom element
  <lite-youtube videoid={videoId}>
    <button type="button" className="lty-playbtn">
      <span className="lyt-visually-hidden">{title}</span>
    </button>
  </lite-youtube>
)

export default YoutubeVideo
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
