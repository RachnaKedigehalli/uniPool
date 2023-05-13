pipeline {
    agent any
    tools {
            maven 'maven'
            // nodejs 'nodejs'
    }
    environment {
        REACT_APP_API_KEY = credentials('location_api_key')
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
                    dockerImage = docker.build "samaelarch/frontend:latest"
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
