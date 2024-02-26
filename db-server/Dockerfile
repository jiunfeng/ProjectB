FROM mariadb:10.4.8
COPY db.sql /docker-entrypoint-initdb.d/
ENV MYSQL_ROOT_PASSWORD 123456
EXPOSE 3306


# 使用指令為 docker build -t projectb-db:<version> .
# <version>要替換為版本號 例如docker build -t projectb-db:1.0 .
# root密碼預設為123456
#會使用db.sql作為初始化資料寫入的儲存