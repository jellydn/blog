---
date: 07/14/2021 6:15 PM +0800
author: Dung Huynh
hero_image: ''
title: Truffle CLI exec with arguments
description: Workaround for Truffle CLI exec with arguments

---
>     const argv = require('yargs-parser')(process.argv.slice(2));
>     
>     /**
>      * Usage: `truffle exec hello.js -n=Dung [--network <name>] [--compile]`,
>      */
>     module.exports = async (callback) => {
>       let name = argv?.n || 'World!';
>       callback(`Hello ${name}`);
>     };