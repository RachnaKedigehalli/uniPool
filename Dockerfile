FROM nginx:latest
COPY frontend.conf /usr/local/nginx/conf/nginx.conf.template
COPY frontend-entrypoint.sh /
COPY build/ /usr/share/nginx/html
RUN chmod 777 /frontend-entrypoint.sh
ENTRYPOINT ["sh","/frontend-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80