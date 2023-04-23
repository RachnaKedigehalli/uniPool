FROM nginx:latest
COPY frontend.conf /usr/local/nginx/conf/nginx.conf
COPY build/ /usr/share/nginx/html
RUN envsubst < /usr/local/nginx/conf/nginx.conf > /usr/local/nginx/conf/nginx.conf
EXPOSE 80