pipeline {
    // 1. Chỉ định Jenkins tạo một Pod trên K8s có chứa sẵn container Docker
    agent {
        kubernetes {
            yaml '''
            apiVersion: v1
            kind: Pod
            spec:
              containers:
              - name: docker
                image: docker:20.10
                command:
                - cat
                tty: true
                volumeMounts:
                - mountPath: /var/run/docker.sock
                  name: docker-sock
              volumes:
              - name: docker-sock
                hostPath:
                  path: /var/run/docker.sock
            '''
        }
    }
    
    environment {
        IMAGE_NAME = "ghcr.io/oppathang/my-app/phongthuy-backend"
        IMAGE_TAG = "v${env.BUILD_ID}" 
        GITHUB_TOKEN = credentials('ghcr-secret-token') 
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                // 2. Chuyển sang dùng container 'docker' vừa khai báo ở trên để chạy lệnh
                container('docker') {
                    script {
                        // Lưu ý: Dùng nháy đơn ' ' ở lệnh này để bảo mật Token tốt hơn
                        sh 'echo $GITHUB_TOKEN | docker login ghcr.io -u oppathang --password-stdin'
                        sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ./backend"
                        sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                    }
                }
            }
        }

        stage('Update K8s Manifest cho ArgoCD') {
            steps {
                script {
                    sh """
                        sed -i 's|image: ${IMAGE_NAME}:.*|image: ${IMAGE_NAME}:${IMAGE_TAG}|g' k8s-manifest/backend.yaml
                        
                        git config user.email "jenkins@example.com"
                        git config user.name "Jenkins CI"
                        git add k8s-manifest/backend.yaml
                        git commit -m "Jenkins tu dong cap nhat image tag thanh ${IMAGE_TAG}"
                        
                        git push https://oppathang:${GITHUB_TOKEN}@github.com/oppathang/my-app.git HEAD:main
                    """
                }
            }
        }
    }
}
