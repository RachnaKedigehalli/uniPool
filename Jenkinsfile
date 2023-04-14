pipeline {
    agent any
    tools {
            maven 'maven'
    }
    environment {
        DATABASE_URL = credentials('uniPool_database_url')
        DATABASE_USERNAME = credentials('uniPool_database_username')
        DATABASE_PASS = credentials('uniPool_database_password')
    }
    stages {
        stage('Git pull') {
            steps {
                git url: 'git@github.com:RachnaKedigehalli/uniPool.git',
                branch: 'user-service',
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
