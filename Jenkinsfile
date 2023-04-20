pipeline {
    agent any
    tools {
            maven 'maven'
            docker 'docker'
    }
    environment {
        DATABASE_URL = credentials('uniPool_database_url')
        DATABASE_USERNAME = credentials('uniPool_database_username')
        DATABASE_PASS = credentials('uniPool_database_password')
        DOCKERHUB_REPO = credentials('uniPool_booking_repo')
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
            steps {
                sh 'docker build -t ${DOCKERHUB_REPO}:latest .'
            }
        }
        stage('Publish to dockerhub') {
            steps {
                withDockerRegistry([ credentialsId: "dockerhub_id", url: "" ]) {
                    sh 'docker push ${DOCKERHUB_REPO}:latest'
                }
            }
        }

    }
}
