---
title: "Reassigning the Caps Lock Key: A Small Change with Big Impact"
seoTitle: "Reassign Caps Lock: Small Change, Big Impact"
seoDescription: "Reassign Caps Lock to boost typing efficiency and enhance your keyboard productivity. Discover how a small change can make a big impact"
datePublished: Mon Aug 05 2024 14:06:16 GMT+0000 (Coordinated Universal Time)
cuid: clzh2e8pt000m09jm492hfj3h
slug: reassigning-the-caps-lock-key-a-small-change-with-big-impact
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/uKceWpLNWcI/upload/cfb10b8aca7e81c4e4f01cda07576913.jpeg
tags: keyboard-shortcuts, keyboard-mapping, karabiner-elements

---

## Context

The first time I had the idea to reassign the **Caps Lock** key to an **Escape** key was when I worked at a startup in Thailand in 2018. I had no idea whether it was possible or advisable to make that change. It turns out that it was the best decision for me, especially as someone with *small hands*.

Recently, I've learned [one more trick](https://youtu.be/XuQVbZ0wENE?si=eFkfIB_GEZOGm_Jp): mapping Caps Lock to Control when holding it with other keys. Wow, it blew my mind.

## Why and how

The **Caps Lock** key is in a good position on the keyboard, but it is also somewhat redundant since ***Shift + Key*** achieves the same result. Reassigning it can enhance your typing efficiency.

Up to today, it is always the first thing I do when I get a new laptop. Install my go-to application: [`Karabiner`](https://karabiner-elements.pqrs.org/) then go to `Complex Modifications`

[![Image from Gyazo](https://i.gyazo.com/e717e1e6af826ba9ef368534373d4f75.png align="left")](https://gyazo.com/e717e1e6af826ba9ef368534373d4f75)

And add the following rule:

```json
{
  "description": "Change caps_lock to left_control if pressed with other keys, change caps_lock to escape if pressed alone.",
  "manipulators": [
    {
      "from": {
        "key_code": "caps_lock",
        "modifiers": { "optional": ["any"] }
      },
      "to": [
        {
          "hold_down_milliseconds": 400,
          "key_code": "left_control"
        }
      ],
      "to_if_alone": [
        {
          "key_code": "escape",
          "lazy": true
        }
      ],
      "type": "basic"
    }
  ]
}
```

You can find more useful rules from the community at [`https://ke-complex-modifications.pqrs.org/`](https://ke-complex-modifications.pqrs.org/)

## Conclusion

It will take time to remember and get used to the new binding, but you will notice it becomes second nature soon enough.

That's all for today. Happy coding and see you next time.