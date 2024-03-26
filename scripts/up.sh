#!/bin/bash
set -e
docker compose build core pngs-to-gif puzzle-generator svg-to-png
docker compose up -d --build -t 1
