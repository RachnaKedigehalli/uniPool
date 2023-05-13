pipeline {
    agent any
    tools {
            maven 'maven'
    }
    stages {
        stage('Git pull') {
            steps {
                git url: 'git@github.com:RachnaKedigehalli/uniPool.git',
                branch: 'api-gateway',
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
                    dockerImage = docker.build  "samaelarch/unipool_api_gateway:latest"
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
        stage('Deploy'){
            steps {
                ansiblePlaybook becomeUser: null, colorized: true, disableHostKeyChecking: true, installation: 'Ansible', inventory: 'inventory', playbook: 'playbook.yml', sudoUser: null
            }
        }
    }
}
