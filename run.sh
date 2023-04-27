#!/bin/bash

if [ $1 = 'dev' ]
then
  echo "running in DEV mode"
  ENV="development" npx expo start
else
  echo "running in PROD mode"
  ENV="production" npx expo start
fi
