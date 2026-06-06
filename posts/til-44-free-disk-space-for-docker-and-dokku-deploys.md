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

`docker system df` on my box pointed at the best targets: **build cache** (~6.9 GB reclaimable), **unused volumes** (~4.7 GB reclaimable), and **images** (~another 6 GB).

Run the steps below **as root**, **in order**. Stop when `df -h /` shows at least **5–10 GB** free.

---

## 1. Build cache first (safest, biggest quick win)

```sh
docker builder prune -af
```

That should reclaim most of the **6.9 GB** build cache with no impact on running containers.

---

## 2. Dokku cleanup (containers + dangling images)

```sh
dokku cleanup
# Per app if you want to be thorough:
dokku apps:list | tail -n +2 | xargs -I{} dokku cleanup {}
```

---

## 3. Purge Dokku build caches (per app)

```sh
dokku apps:list | tail -n +2 | while read app; do
  echo "=== purge-cache $app ==="
  dokku repo:purge-cache "$app"
done
```

---

## 4. Unused Docker images

```sh
docker image prune -af
```

Running apps keep their active images; this removes unused layers only.

---

## 5. Git object cleanup (per app)

```sh
dokku apps:list | tail -n +2 | while read app; do
  echo "=== repo:gc $app ==="
  dokku repo:gc "$app"
done
```

---

## 6. Unused volumes (careful — can delete data)

I had **23 volumes**, only **1 active** — about **4.7 GB** reclaimable. These are often leftover from destroyed Postgres/Redis/RabbitMQ services.

Inspect before pruning:

```sh
docker volume ls
docker volume ls -f dangling=true
```

If you recognize orphans from apps/services you already destroyed:

```sh
docker volume prune -f
```

Do **not** run `docker system prune -af --volumes` unless you accept losing data from any unused volume.

---

## 7. Clear deploy locks (if deploys still fail)

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

## 8. Verify

After cleanup (aim for ≥ 5 GB free before pushing again):

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
