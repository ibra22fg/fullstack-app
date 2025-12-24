pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'fullstack-app'
        CONTAINER_NAME = 'fullstack-container'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling code from GitHub...'
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    sh 'docker build -t ${DOCKER_IMAGE} .'
                }
            }
        }
        
        stage('Stop Old Container') {
            steps {
                echo 'Stopping old container...'
                script {
                    sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                    '''
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying new container...'
                script {
                    sh 'docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${DOCKER_IMAGE}'
                }
            }
        }
        
        stage('Verify') {
            steps {
                echo 'Verifying deployment...'
                script {
                    sh 'docker ps | grep ${CONTAINER_NAME}'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
