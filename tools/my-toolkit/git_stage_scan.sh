#!/bin/bash

checkpoint=$PWD

git_stage_scan(){
   echo -e "\033[1;34m git status from : \033[0m \033[1;33m$1\033[0m" 
   cd $1
   git status
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
git_stage_scan ./@study
git_stage_scan ./@org/ethereum-development-guide
git_stage_scan ./@org/flagtail-express
git_stage_scan ./@org/flagtail-js
git_stage_scan ./@project/mesopotamia-hub
git_stage_scan ./@private/Publish.Inc
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