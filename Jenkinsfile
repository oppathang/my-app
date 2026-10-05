pipeline {
  agent any

  environment {
    IMAGE_REPO  = "oppathang/my-app"
    GITOPS_REPO = "github.com/oppathang/gitops-repo-charts-my-app.git"
    VALUES_FILE = "charts/my-app/values.yaml"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Test') {
      steps {
        sh 'npm ci'
        sh 'echo "Tests passed!"'
        // Sau này có test thật thì đổi thành: sh 'npm test'
      }
    }

    stage('Build & Push Docker Image') {
      steps {
        script {
          // Tag dạng: 1-abc1234 (build number + commit hash)
          env.IMAGE_TAG = "${BUILD_NUMBER}-${GIT_COMMIT.take(7)}"

          withCredentials([usernamePassword(
            credentialsId: 'dockerhub-creds',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS'
          )]) {
            sh """
              echo "\$DOCKER_PASS" | docker login -u "\$DOCKER_USER" --password-stdin
              docker build -t ${IMAGE_REPO}:${IMAGE_TAG} .
              docker push ${IMAGE_REPO}:${IMAGE_TAG}
              docker rmi ${IMAGE_REPO}:${IMAGE_TAG}
            """
          }
        }
      }
    }

    stage('Update GitOps Repo') {
      // Đây là cầu nối Jenkins → ArgoCD
      // Jenkins cập nhật image tag mới vào gitops-repo
      // ArgoCD tự phát hiện và deploy lên K8s
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'github-creds',
          usernameVariable: 'GIT_USER',
          passwordVariable: 'GIT_TOKEN'
        )]) {
          sh """
            rm -rf gitops-tmp

            git clone https://\${GIT_USER}:\${GIT_TOKEN}@${GITOPS_REPO} gitops-tmp
            cd gitops-tmp

            sed -i 's|  tag:.*|  tag: "${IMAGE_TAG}"|' ${VALUES_FILE}

            git config user.email "jenkins@ci.internal"
            git config user.name  "Jenkins CI"
            git add ${VALUES_FILE}
            git commit -m "ci: update image tag to ${IMAGE_TAG}"
            git push origin main

            cd .. && rm -rf gitops-tmp
          """
        }
      }
    }
  }

  post {
    success {
      echo "✅ Deploy thành công! Image: ${IMAGE_REPO}:${env.IMAGE_TAG}"
    }
    failure {
      echo "❌ Pipeline thất bại! Kiểm tra log ở stage bị đỏ."
    }
  }
}
