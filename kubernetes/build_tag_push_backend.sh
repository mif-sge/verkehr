#!/bin/sh

sudo docker build -t verkehr_backend ../backend/trafficnode-server
sudo docker tag verkehr_backend:latest 558558437971.dkr.ecr.eu-central-1.amazonaws.com/verkehr_backend:latest  
sudo docker push 558558437971.dkr.ecr.eu-central-1.amazonaws.com/verkehr_backend:latest
