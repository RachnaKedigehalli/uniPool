pipeline {
    agent any
    tools {
            maven 'maven'
    }
    environment {
        DATABASE_URL = credentials('uniPool_database_url')
        DATABASE_USERNAME = credentials('uniPool_database_username')
        DATABASE_PASS = credentials('uniPool_database_password')
        // DOCKERHUB_REPO = credentials('uniPool_booking_repo')
    }
    stages {
        stage('Git pull') {
            steps {
                git url: 'git@github.com:RachnaKedigehalli/uniPool.git',
                branch: 'booking-service',
                credentialsId: 'github_ssh'
            }
        }

        stage('Build and Test') {
            steps {
                sh 'mvn clean package'
            }
        }
        stage('Build docker image') {
            steps{
                script {
                    dockerImage = docker.build "samaelarch/unipool_booking_service"
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
