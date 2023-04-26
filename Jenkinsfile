pipeline {
    agent any
    tools {
            maven 'maven'
    }
    environment {
        HOSTNAME = 'localhost'
    }
    stages {
        stage('Git pull') {
            steps {
                git url: 'git@github.com:RachnaKedigehalli/uniPool.git',
                branch: 'service-registry',
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
                    dockerImage = docker.build "samaelarch/unipool_service_registry"
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
