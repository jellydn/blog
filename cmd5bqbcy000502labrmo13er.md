---
title: "Label Your AI vs Human Code in Commit"
datePublished: Wed Jul 16 2025 02:10:14 GMT+0000 (Coordinated Universal Time)
cuid: cmd5bqbcy000502labrmo13er
slug: label-your-ai-vs-human-code-in-commit
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/505eectW54k/upload/cd7691d4eb7e9a4cb6baf98335b2337c.jpeg
tags: ai, git, tips, coding

---

## Quick Tip for Better Team Collaboration

Since many teams already have their git commit practices, here’s a simple addition that makes a big difference:

**AI-Generated Code:**

Thore are good examples from my [https://github.com/jellydn/moleculer-typescript-template/](https://github.com/jellydn/moleculer-typescript-template/)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752631446480/d5eb3212-c429-423a-a64a-8f2911e5fc6e.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752631473081/8a5e1cd2-4007-4da0-aaab-effac0f51297.png align="center")

In short, we should keep this as a convention for git.

```plaintext
feat: implement user authentication

[AI-Generated | Human Supervised]
```

**Human-Written Code:**

Here is the some example from my [https://github.com/jellydn/tiny-nvim](https://github.com/jellydn/tiny-nvim)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752631632974/9fb181e6-1fbe-49ba-bb3e-871751cb4424.png align="center")

```plaintext
feat: implement user authentication

[Engineer-Written]
```

## Why Do This?

* Reviewers know what they’re looking at instantly
    
* Team learns from both AI and human approaches
    
* Builds trust in AI tools through transparency
    
* Creates clear accountability
    

## Bonus Tip: Clean Up AI Comments

AI tools often generate redundant or overly verbose comments. Clean them up:

**Remove:**

```javascript
// This function calculates the sum of two numbers
function add(a, b) {
    return a + b; // Returns the sum of a and b
}
```

**Keep:**

```javascript
function add(a, b) {
    return a + b;
}
```

Only keep comments that explain *why*, not *what*.

## Just Add It

If you’re already updating your commit standards, consider adding this. It takes 5 seconds per commit and saves everyone time during reviews.

Your team will appreciate the clarity.