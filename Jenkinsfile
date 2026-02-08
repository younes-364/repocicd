pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "your-dockerhub-username/node-app:latest"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/younes-364/repocicd'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh "docker build -t $DOCKER_IMAGE ."
            }
        }
        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker push $DOCKER_IMAGE"
                }
            }
        }
        stage('Deploy to K8s') {
            steps {
                sh "docker run --rm -v $HOME/.kube:/root/.kube -v $(pwd):/workspace bitnami/kubectl:latest apply -f /workspace/k8s/deployment.yaml"
            }
        }
    }
}