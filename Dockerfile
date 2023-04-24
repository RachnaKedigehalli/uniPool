FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
# COPY frontend.conf /usr/local/nginx/conf/nginx.conf.template
COPY frontend.conf /etc/nginx/conf.d/nginx.conf
# COPY frontend-entrypoint.sh /
COPY build/ /usr/share/nginx/html
# RUN chmod 777 /frontend-entrypoint.sh
# ENTRYPOINT ["sh","/frontend-entrypoint.sh"]

# CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80