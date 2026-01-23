#!/usr/bin/env bash

git add .
git checkout --orphan tmp
git commit -m "initial commit"
git checkout -B main
git branch -d tmp
git push --force-with-lease origin main
#git push origin main
