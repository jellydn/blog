---
date: 05/31/2022 11:41 AM +0800
tag:
- redis
- aws
- Amazon ElastiCache
author: Dung Huynh
hero_image: ''
title: 'TIL #26 - How to connect to Redis on AWS (Amazon ElastiCache)'
description: This is common issue on https://github.com/luin/ioredis for connecting
  to Redis on AWS

---
    import Redis, { RedisOptions } from 'ioredis';
    
    const parseRedisCredentials = (url: string, opts: RedisOptions = {}): RedisOptions => {
    	const { port, hostname, password, pathname } = new URL(url);
    	const db = pathname.startsWith('/') ? Number(pathname.split('/')[1]) : 0;
    	const baseOpts = {
    		port: Number(port),
    		host: hostname,
    		password,
    		db,
    	};
    	if (!url.startsWith('rediss://')) {
    		const { tls: _, ...rest } = opts;
    		return { ...baseOpts, ...rest };
    	}
    
    	return { ...baseOpts, ...opts };
    };
    
    export const redisClient = new Redis(
    	parseRedisCredentials(process.env.REDIS_CONNECTION ?? 'redis://localhost:6379', {
    		lazyConnect: true,
    		connectTimeout: 15000,
    		retryStrategy: (times) => Math.min(times * 30, 1000),
    		reconnectOnError(error) {
    			const targetErrors = [/READONLY/, /ETIMEDOUT/];
    			logger.warn(`Redis connection error: ${error.message}`, error);
    			return targetErrors.some((targetError) => targetError.test(error.message));
    		},
    	}),
    );