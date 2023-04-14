pipeline {
    agent any
    tools {
            maven 'maven'
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

    }
}
