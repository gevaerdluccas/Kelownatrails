pipeline{
    agent any
    environment {
    FIREBASE_DEPLOY_TOKEN = credentials('firebase-token')
    }

 stages{
        stage('Building'){
            steps{
           // sh 'npm install -g firebase-tools'
                echo 'Biulding...'
            }
        } 
        stage('Testing Environment'){
            steps{
            sh 'firebase deploy -P kelownatrails-testing-6cd41 --token "$FIREBASE_DEPLOY_TOKEN"'
            }
        } 
        stage('Staging Environment'){
            steps{
             sh 'firebase deploy -P kelownatrails-staging-a1f5d --token "$FIREBASE_DEPLOY_TOKEN"'
            }
        } 
        stage('Production Environment'){
            steps{
            sh 'firebase deploy -P kelownatrails-production-455c7 --token "$FIREBASE_DEPLOY_TOKEN"'
            }
        } 
    }

}
