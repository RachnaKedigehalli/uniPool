pipeline {
    agent any
    tools {
            maven 'maven'
    }
    environment {
        DOCKERHUB_REPO = credentials('uniPool_frontend_repo')
    }
    stages {
        stage('Git pull') {
            steps {
                git url: 'git@github.com:RachnaKedigehalli/uniPool.git',
                branch: 'frontend',
                credentialsId: 'github_ssh'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install && npm run build'
            }
        }
        stage('Build docker image') {
            steps{
                script {
                    dockerImage = docker.build DOCKERHUB_REPO
                }
            }
        }
        stage('Publish to dockerhub') {
            environment {
               registryCredential = 'dockerhub_id'
           }
            steps{
                script {
                docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
                    dockerImage.push("latest")
                }
                }
            }
        }

    }
}
