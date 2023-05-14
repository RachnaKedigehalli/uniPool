FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
COPY frontend.conf /etc/nginx/conf.d/nginx.conf
COPY build/ /usr/share/nginx/html
EXPOSE 3000