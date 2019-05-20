#!/usr/bin/env bash

cd documentation && \

rm -R .git
git init && \

git config user.name "DorogiB" && \
git config user.email "dbenjamin@inf.elte.hu" && \

git add . && \
git commit -m "Deploy to GitHub Pages" && \

git push --force "https://${GITHUB_TOKEN}@${GITHUB_REF}" master:gh-pages
