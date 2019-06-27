#!/bin/sh

sudo docker build -t verkehr_frontend ../frontend
sudo docker tag verkehr_frontend:latest 558558437971.dkr.ecr.eu-central-1.amazonaws.com/verkehr_frontend:latest
sudo docker push 558558437971.dkr.ecr.eu-central-1.amazonaws.com/verkehr_frontend:latest

