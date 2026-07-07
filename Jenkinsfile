pipeline {
    agent any
    
    // Cài đặt các biến môi trường
    environment {
        // Tên image của bạn
        IMAGE_NAME = "ghcr.io/oppathang/my-app/phongthuy-backend"
        // Tạo mã phiên bản dựa vào ID của lần chạy Jenkins (VD: v1, v2, v3...)
        IMAGE_TAG = "v${env.BUILD_ID}" 
        // Khai báo credential GitHub (Bạn cần tạo một Secret Text trên Jenkins chứa GitHub Token)
        GITHUB_TOKEN = credentials('github-token-secret-id') 
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Lấy code mới nhất từ GitHub về
                checkout scm
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                script {
                    // Đăng nhập vào GHCR
                    sh "echo ${GITHUB_TOKEN} | docker login ghcr.io -u oppathang --password-stdin"
                    
                    // Đóng hộp Bento với số phiên bản mới
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ./backend"
                    
                    // Đẩy lên kho
                    sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Update K8s Manifest cho ArgoCD') {
            steps {
                script {
                    // 1. Dùng lệnh 'sed' để tìm và thay thế dòng image trong file yaml thành phiên bản mới nhất
                    sh """
                        sed -i 's|image: ${IMAGE_NAME}:.*|image: ${IMAGE_NAME}:${IMAGE_TAG}|g' k8s-manifest/backend.yaml
                    """
                    
                    // 2. Đẩy file yaml đã sửa lên lại GitHub
                    sh """
                        git config user.email "jenkins@example.com"
                        git config user.name "Jenkins CI"
                        git add k8s-manifest/backend.yaml
                        git commit -m "Jenkins tự động cập nhật image tag thành ${IMAGE_TAG}"
                        
                        // Push lên Github (sử dụng Token để xác thực)
                        git push https://oppathang:${GITHUB_TOKEN}@github.com/oppathang/my-app.git HEAD:main
                    """
                }
            }
        }
    }
}
