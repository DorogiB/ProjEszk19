#!/usr/bin/env bash

# GIT_DEPLOY_REPO=${GIT_DEPLOY_REPO:-$(node -p -e "require('./package.json').repository.url")}

git config --global user.name "DorogiB" && \
git config --global user.email "dbenjamin@inf.elte.hu" && \

git checkout master && \

cp module-backend/target/module-backend*.war deployment && \

git add deployment/* && \
git commit --message "Deploying application" && \

git push --force --set-upstream "https://${GITHUB_TOKEN}@${GITHUB_REF}" master:master
