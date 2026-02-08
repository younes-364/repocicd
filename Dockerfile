FROM node:18-alpine AS nodebuild
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

FROM jenkins/jenkins:lts-jdk17
USER root
RUN apt-get update && \
    apt-get install -y docker.io git curl && \
    rm -rf /var/lib/apt/lists/*
USER jenkins

# Copy Node app into Jenkins image (if needed)
COPY --from=nodebuild /app /app
