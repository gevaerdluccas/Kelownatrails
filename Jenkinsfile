pipeline {
    agent any

    environment {
        FIREBASE_TOKEN = credentials('firebase-token') // Fetch the token from Jenkins credentials
    }

    stages {
        stage('Building') {
            steps {
                echo 'Installing Firebase tools...'
                sh 'sudo npm install -g firebase-tools'
            }
        }

        stage('Testing') {
            steps {
                echo 'Deploying to Firebase Testing Environment...'
                sh 'firebase deploy --project kelownatrails-testing-6cd41 --token $FIREBASE_TOKEN'
            }
        }

        stage('Staging') {
            steps {
                echo 'Deploying to Firebase Staging Environment...'
                sh 'firebase deploy --project kelownatrails-staging-a1f5d --token $FIREBASE_TOKEN'
            }
        }

        stage('Production') {
            steps {
                echo 'Deploying to Firebase Production Environment...'
                sh 'firebase deploy --project kelownatrails-production-455c7 --token $FIREBASE_TOKEN'
            }
        }
    }
}

