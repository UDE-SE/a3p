#!/usr/bin/env bash

docker build -t a3p_api -f BackendAPIDockerfile .
docker build -t a3p_services -f BackendServicesDockerfile .
docker build -t a3p_frontend -f FrontendDockerfile .
