FROM nginx:alpine
# Xóa cấu hình mặc định của Nginx
RUN rm -rf /usr/share/nginx/html/*
# Copy file giao diện vào thư mục public của Nginx
COPY index.html /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
