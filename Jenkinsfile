pipeline {
    agent any

    stages {

        stage('Build & Test') {
            agent {
                docker {
                    image 'node:18-bullseye'
                    args '-u root:root'
                }
            }
            steps {
                sh 'npm install'
                sh 'npm test || true'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t younes/app:latest .'
            }
        }

        stage('Deploy to K8s') {
            agent {
                docker {
                    image 'bitnami/kubectl:latest'
                    args '-v /root/.kube:/root/.kube'
                }
            }
            steps {
                sh 'kubectl apply -f k8s/deployment.yaml'
            }
        }
    }
}
