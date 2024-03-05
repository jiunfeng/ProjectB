FROM node:20.11.1-alpine3.19 as builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx as production

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80


RUN rm /etc/nginx/conf.d/default.conf

ADD default.conf /etc/nginx/conf.d/

# CMD ["nginx","-g","daemon off"]
# COPY dist/ /usr/share/nginx/html/