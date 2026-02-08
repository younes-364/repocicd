pipeline {
  agent any

  environment {
    IMAGE_NAME = "devops-app:${BUILD_NUMBER}"
  }

  stages {

    stage('Clone') {
      steps { checkout scm }
    }

    stage('Build & Test') {
      steps {
        sh 'npm install'
        sh 'npm test'
      }
    }

    stage('Docker Build') {
      steps {
        sh "docker build -t $IMAGE_NAME ."
      }
    }

    stage('Deploy to K8s') {
      steps {
        sh "sed -i 's|IMAGE|$IMAGE_NAME|' k8s/deployment.yaml"
        sh "kubectl apply -f k8s/"
      }
    }
  }
}
