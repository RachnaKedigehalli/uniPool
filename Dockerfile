FROM openjdk:11
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} blacklist-service.jar
ENTRYPOINT [ "java", "-jar", "blacklist-service.jar" ]
EXPOSE 8083