pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "node-app"   // just the repo name
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/younes-364/repocicd'
            }
        }
        stage('Build Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                                  usernameVariable: 'DOCKER_USER',
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker build -t $DOCKER_USER/$DOCKER_IMAGE:${env.BUILD_NUMBER} ."
                }
            }
        } 
        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                                  usernameVariable: 'DOCKER_USER',
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    sh "docker push $DOCKER_USER/$DOCKER_IMAGE:${env.BUILD_NUMBER}"
                }
            }
        }
        stage('Deploy Rolling Update') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                                  usernameVariable: 'DOCKER_USER',
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    sh "kubectl set image deployment/node-app node-app=$DOCKER_USER/$DOCKER_IMAGE:${env.BUILD_NUMBER} -n dev"
                    // sh "kubectl rollout status deployment/node-app -n dev"
                    sh "kubectl apply -f k8s/service.yaml -n dev"
                }
            }
        }
    }
}