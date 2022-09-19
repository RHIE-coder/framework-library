#!/bin/bash

checkpoint=$PWD

git_pull_main(){
   echo -e "\033[1;34m git pull from : \033[0m \033[1;33m$1\033[0m" 
   cd $1
   git pull origin main
   cd $checkpoint
   echo ""
   echo -e "\033[1;36m======================================\033[0m"
   echo ""
}

echo -e "\033[1;32mvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\033[0m"
echo -e "\033[1;32mvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\033[0m"
echo -e "\033[1;32mvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\033[0m"
echo -e "\033[1;32mvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\033[0m"
echo -e "\033[1;32mvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\033[0m"
echo -e "\033[1;32mvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\033[0m"
echo -e "\033[1;32mvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\033[0m"
echo -e "\033[1;32mvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\033[0m"
echo -e "\033[1;32mvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\033[0m"
echo -e "\033[1;32mvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\033[0m"
echo -e "\033[1;32mvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\033[0m"
echo -e "\033[1;32mvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\033[0m"
git_pull_main ./@study
git_pull_main ./@org/ethereum-development-guide
git_pull_main ./@org/flagtail-express
git_pull_main ./@org/flagtail-js
git_pull_main ./@project/mesopotamia-hub
git_pull_main ./@private/Publish.Inc
echo -e "\033[1;32m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\033[0m"
echo -e "\033[1;32m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\033[0m"
echo -e "\033[1;32m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\033[0m"
echo -e "\033[1;32m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\033[0m"
echo -e "\033[1;32m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\033[0m"
echo -e "\033[1;32m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\033[0m"
echo -e "\033[1;32m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\033[0m"
echo -e "\033[1;32m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\033[0m"
echo -e "\033[1;32m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\033[0m"
echo -e "\033[1;32m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\033[0m"
echo -e "\033[1;32m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\033[0m"
echo -e "\033[1;32m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\033[0m"

