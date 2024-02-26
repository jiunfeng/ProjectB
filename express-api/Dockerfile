FROM node:20.11.1-alpine3.19 as builder
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node","app.js"]

# 使用指令為 docker build -t projectb-backend:<version> .
# <version>要替換為版本號 例如docker build -t projectb-backend:1.0 .
