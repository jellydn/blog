---
date: "2021-11-11T02:57:00.000Z"
tag:
  - flutter
  - makefile
  - cli
author: Dung Huynh
hero_image: /IT Man Main Logo 800x600.png
title: Simply the flutter flow with Makefile
description: Streamline Flutter development workflow with Makefile
---

## Context

Flutter development involves repetitive commands: clean, build, test, format, lint. A Makefile provides consistent shortcuts and ensures quality checks (format, lint, tests) run automatically before commits.

## Usage

**Makefile:**
```makefile
.PHONY: all run_dev_web run_dev_mobile run_unit clean upgrade lint format build_dev_mobile help

help: ## Show available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

run_unit: ## Run unit tests
	@flutter test

clean: ## Clean build artifacts
	@rm -rf pubspec.lock && flutter clean

format: ## Format code
	@dart format .

lint: ## Analyze code
	@dart analyze .

commit: format lint run_unit ## Format, lint, test, then commit
	@git add . && git commit

run_dev_web: ## Run web app in dev mode
	@flutter run -d chrome --dart-define=ENVIRONMENT=dev

run_dev_mobile: ## Run mobile app in dev mode
	@flutter run --flavor dev

build_dev_mobile: clean run_unit ## Build dev APK
	@flutter build apk --flavor dev
```

**Commands:**
```sh
make help        # List all commands
make run_dev_web # Start web dev server
make commit      # Format, lint, test, commit
```
