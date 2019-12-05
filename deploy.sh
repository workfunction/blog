#!/usr/bin/env sh

# throw error
set -e

if [[ -z "$CODING_TOKEN"  || -z "$GITHUB_TOKEN" ]]; then
  exit 0
fi

git config --global user.name "$GIT_NAME"
git config --global user.email "$GIT_EMAIL"

# build static
npm run build
cd .vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push --quiet -f "https://workfunction:$GITHUB_TOKEN@github.com/workfunction/workfunction.github.io.git" master

cd -

rm -rf .vuepress/dist