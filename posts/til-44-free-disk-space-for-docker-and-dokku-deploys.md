---
author: Dung Huynh
date: "06/06/2026 12:00 PM +0800"
hero_image: /static/til.jpeg
title: "#TIL 44 - Freeing disk space on a Dokku server before deployments fail"
description: When Dokku deploys fail mysteriously, check disk space first—then reclaim Docker build cache, Dokku caches, and unused images
tag:
  - docker
  - dokku
  - devops
---

Today I learned that when a Dokku server starts failing deployments with mysterious Docker build errors, the root cause is often much simpler: **the disk is full**.

In my case, the server had only **187 MB free** on a **72 GB** volume, which meant Docker could no longer create build layers, temporary directories, or image artifacts.

## Check disk usage first

Before troubleshooting Docker or Dokku, always verify available disk space:

```sh
df -h /
docker system df
```

If free space is under 1 GB, deployment failures are almost guaranteed.

---

## 1. Remove Docker build cache

This is usually the safest and most effective cleanup.

```sh
docker builder prune -af
```

On my server, Docker build cache was consuming nearly **7 GB**.

This command removes cached build layers while keeping running containers untouched.

---

## 2. Run Dokku cleanup

Dokku keeps old containers and images around for rollback purposes.

```sh
dokku cleanup
```

Or clean every application individually:

```sh
dokku apps:list | tail -n +2 | xargs -I{} dokku cleanup {}
```

---

## 3. Purge Dokku build cache

Each Dokku application can accumulate build cache over time.

```sh
dokku apps:list | tail -n +2 | while read app; do
  echo "=== purge-cache $app ==="
  dokku repo:purge-cache "$app"
done
```

This often recovers several additional gigabytes.

---

## 4. Remove unused Docker images

Docker images pile up quickly after multiple deployments.

```sh
docker image prune -af
```

Running applications are unaffected because Docker only removes images that are no longer referenced.

---

## 5. Clean Git objects stored by Dokku

Each Dokku application stores a Git repository.

Over time, these repositories accumulate unnecessary objects.

```sh
dokku apps:list | tail -n +2 | while read app; do
  echo "=== repo:gc $app ==="
  dokku repo:gc "$app"
done
```

---

## 6. Remove unused Docker volumes

Volumes can silently consume large amounts of storage.

First inspect them:

```sh
docker volume ls
docker volume ls -f dangling=true
```

If the volumes belong to services you already removed:

```sh
docker volume prune -f
```

⚠️ Be careful. Volumes often contain database data. Verify before deleting.

---

## 7. Remove stale deploy locks

Sometimes a failed deployment leaves lock files behind.

Find them:

```sh
find /home/dokku -name LOCK -print
```

Remove stale locks:

```sh
rm -f /home/dokku/docklight/LOCK
rm -f /home/dokku/docklight-staging/LOCK
```

---

## 8. Verify recovery

After cleanup:

```sh
df -h /
docker system df
```

A good target is at least **5–10 GB** of free space before attempting another deployment.

Example after a successful cleanup on a 72 GB volume:

```text
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        72G   55G   17G  77% /
```

That is enough headroom for Docker builds and Dokku deploys again.

---

## Key takeaway

When Dokku deployments start failing unexpectedly:

1. Check disk space first.
2. Remove Docker build cache.
3. Run Dokku cleanup.
4. Purge old images and caches.
5. Verify free space before redeploying.

Most deployment failures are not application problems—they are **infrastructure hygiene** problems.

A few cleanup commands can recover more than 10 GB in minutes and save hours of debugging.
