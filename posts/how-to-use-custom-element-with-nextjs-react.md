---
date: '2021-09-07T19:12:00.000Z'
tag:
    - React
    - NextJs
author: Dung Huynh
hero_image: /IT Man Main Logo 800x600.png
title: How to use custom element with NextJS/React
description: >-
    By use lite-youtube-embed and dynamic import, we will have a custom element
    with your React component
---

Hi there,

There is a feature that I have just implemented on my blog. That's embedded Youtube player on homepage. I guess you don't want to embed **heavy JS/CSS** from Youtube to your website. Lucky us, there is a pretty good library that will resolve this one [https://github.com/paulirish/lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed 'lite-youtube-embed')

### Create Youtube component

As JSX won't understand the **custom element** so I will use **@ts-expect-error** as a workaround. If you have any better solution, please let me know :)

```
import 'lite-youtube-embed/src/lite-yt-embed.css'
import 'lite-youtube-embed/src/lite-yt-embed.js'

const YoutubeVideo = ({
  videoId,
  title,
}: {
  videoId: string
  title: string
}) => (
  // @ts-expect-error Property  does not exist on type 'JSX.IntrinsicElements'
  <lite-youtube videoid={videoId}>
    <button type="button" className="lty-playbtn">
      <span className="lyt-visually-hidden">{title}</span>
    </button>
    {/* @ts-expect-error Property  does not exist on type 'JSX.IntrinsicElements' */}
  </lite-youtube>
)

export default YoutubeVideo
```

### Usage

I will use **dynamic import** to load the component on demand and turn off SSR.

```
import dynamic from 'next/dynamic'

const YoutubeVideo = dynamic(() => import('./YoutubeVideo'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
})

// ...

<YoutubeVideo
  videoId={post.youtube_id}
  title={post.title}
/>
```

That's it. Hopefully, you will find this helpful. Cheer.
