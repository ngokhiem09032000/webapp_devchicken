# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Chỉ copy package.json và yarn.lock trước, để tận dụng caching layer
COPY package.json yarn.lock ./

# Cài đặt dependencies (chỉ các dependency cần thiết cho production)
RUN yarn install --frozen-lockfile

# Copy phần còn lại của ứng dụng và build
COPY . .
RUN yarn build

# Production stage
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Copy build files từ builder
COPY --from=builder /app/build .

# Thêm cấu hình Nginx trực tiếp vào Dockerfile
RUN rm /etc/nginx/conf.d/default.conf
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# CMD to run nginx
CMD ["nginx", "-g", "daemon off;"]
