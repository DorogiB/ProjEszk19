#!/usr/bin/env bash

git config --global user.name "DorogiB" && \
git config --global user.email "dbenjamin@inf.elte.hu" && \

git checkout master && \

cp module-backend/target/module-backend*.war deployment && \

git add deployment/* && \
git commit --message "Deploying application" && \

git push --quiet --set-upstream "https://${GITHUB_TOKEN}@${GITHUB_REF}" master:master
