#!/bin/bash

# Pull the latest version of your application image
docker pull dapsonic/devops_com619-devops:latest

# Pull the MySQL image
docker pull mysql:5.7

# Stop existing containers (if any)
docker stop myapp-db || true
docker rm myapp-db || true
docker stop myapp || true
docker rm myapp || true

# Start MySQL container
docker run -d --name myapp-db -e MYSQL_ROOT_PASSWORD=devops -e MYSQL_DATABASE=myappdb -p 3306:3306 mysql:5.7

# Start your application container
# Make sure to link it to the MySQL container or provide database connection information
docker run -d --name myapp --link myapp-db:mysql -p 80:80 dapsonic/devops_com619-devops:latest
