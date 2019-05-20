#!/usr/bin/env bash

# GIT_DEPLOY_REPO=${GIT_DEPLOY_REPO:-$(node -p -e "require('./package.json').repository.url")}

cp module-backend/target/module-backend*.war deployment && \

git config user.name "DorogiB" && \
git config user.email "dbenjamin@inf.elte.hu" && \

git add deployment/* && \
git commit -m "Deploying application" && \

git push --force "https://${GITHUB_TOKEN}@${GITHUB_REF}" master:master
