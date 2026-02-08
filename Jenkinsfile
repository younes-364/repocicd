pipeline {
  agent {
    docker {
      image 'node:18-bullseye'   // Debian-based Node.js image
      args '-v /var/run/docker.sock:/var/run/docker.sock'
    }
  }

  environment {
    IMAGE_NAME = "devops-app:${BUILD_NUMBER}"
  }

  stages {
    stage('Clone') {
      steps {
        git branch: 'main',
            url: 'git@github.com:username/repo.git',
            credentialsId: 'github-ssh-key'
      }
    }

    stage('Install & Test') {
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
