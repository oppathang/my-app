Bản đồ để đóng gói ứng dụng này thành 1 container (hộp bento) mang lên K8s.
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
