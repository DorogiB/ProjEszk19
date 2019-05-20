#!/usr/bin/env bash

git config --global user.name "DorogiB" && \
git config --global user.email "dbenjamin@inf.elte.hu" && \

git checkout master && \

cp module-backend/target/module-backend*.war deployment && \

git add deployment/* && \
git commit --message "Deploying application" && \
git tag v$GIT_TAG_VERSION -a -m "Tagging version v$GIT_TAG_VERSION" && \

# git push --quiet --set-upstream "https://${GITHUB_TOKEN}@${GITHUB_REF}" master:master
git push origin $TRAVIS_BRANCH
git push origin $TRAVIS_BRANCH --tags
