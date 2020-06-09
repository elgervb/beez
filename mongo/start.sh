#!/bin/bash
brew services stop mongodb

# create data dir when not exists
if [ ! -d "/path/to/dir" ]
then
    mkdir ./data
fi

mongod --dbpath ./data