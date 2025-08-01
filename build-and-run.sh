#!/bin/bash

echo "Building Docker image..."
docker build -t jobs-portal .

echo "Running Docker container..."
docker run -d -p 8080:8080 --name jobs-portal-container jobs-portal

echo "Container is running on http://localhost:8080"
echo "To stop the container: docker stop jobs-portal-container"
echo "To remove the container: docker rm jobs-portal-container" 