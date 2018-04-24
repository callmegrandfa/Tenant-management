pipeline {
  agent any
  stages {
    stage('Clear Container') {
      steps {
        sh ''' #!/bin/sh
docker container prune << EOF
y
EOF
docker container ls -a | grep "web_tenant"
if [ $? -eq 0 ];then
	docker container stop web_tenant
	docker container rm web_tenant
fi
docker image prune << EOF
y
EOF'''
      }
    }
    stage('Build Container') {
      steps {
        sh 'docker build -t web_tenant .'
      }
    }
    stage('Deploy Container') {
      steps {
        sh 'docker run -d -p 8087:5000 --name=web_tenant web_tenant'
      }
    }
  }
}