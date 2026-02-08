FROM jenkins/jenkins:lts-jdk17

USER root

# Install base tools
RUN apt-get update && \
    apt-get install -y docker.io git curl && \
    rm -rf /var/lib/apt/lists/*

# Install kubectl (fixed method)
RUN curl -LO "https://dl.k8s.io/release/v1.29.0/bin/linux/amd64/kubectl" && \
    install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl && \
    rm kubectl

USER jenkins
