pipeline {
  agent any
  stages {
    stage('Clear Container') {
      steps {
        sh '''#!/bin/sh
docker container prune << EOF
y
EOF
docker container ls -a | grep "web_erp"
if [ $? -eq 0 ];then
	docker container stop web_erp
	docker container rm web_erp
fi
docker image prune << EOF
y
EOF'''
      }
    }
    stage('Build Container') {
      steps {
        sh 'docker build -t web_erp .'
      }
    }
    stage('Depoly') {
      steps {
        sh 'docker run -d -p 8084:8080 --name=web_erp web_erp'
      }
    }
  }
}