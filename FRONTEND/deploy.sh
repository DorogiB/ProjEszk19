#!/usr/bin/env bash

# GIT_DEPLOY_REPO=${GIT_DEPLOY_REPO:-$(node -p -e "require('./package.json').repository.url")}

cd documentation && \

rm -R .git
git init && \

git config user.name "DorogiB" && \
git config user.email "dbenjamin@inf.elte.hu" && \

git add . && \
git commit -m "Deploy to GitHub Pages" && \

echo ${GITHUB_TOKEN} && \
echo ${GITHUB_REF} && \

git push --force "https://${GITHUB_TOKEN}@${GITHUB_REF}" master:gh-pages > /dev/null 2>&1
