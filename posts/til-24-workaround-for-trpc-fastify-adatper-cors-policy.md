---
date: '03/07/2022 10:20 AM +0800'
tag:
    - fastify
    - trpc
author: Dung Huynh
hero_image: /static/til.jpeg
title: '#TIL 24 - Workaround for tRPC Fastify adatper CORS policy'
description: 'Handling CORS and CORS preflight requests '
_template: post
---

    void app.register(fp(fastifyTRPCPlugin), {
      prefix: "/trpc",
      trpcOptions: {
        router: appRouter,
        createContext,
        responseMeta(opts: any) {
          if (
            opts.errors?.[0]?.code === "METHOD_NOT_SUPPORTED" &&
            String(opts.errors?.[0]?.message ?? "").includes(
              "Unexpected request method OPTIONS"
            )
          ) {
            return {
              status: 204,
              headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "access-control-allow-origin": "*",
                vary: "Origin",
              },
            };
          }

          return {
            // Enable CORS, refer https://github.com/trpc/trpc/issues/623#issuecomment-878639248
            headers: {
              "Access-Control-Allow-Headers": "Content-Type",
              "access-control-allow-origin": "*",
              vary: "Origin",
            },
          };
        },
      },
    });
