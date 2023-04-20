FROM openjdk:11
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} aoi-gateway.jar
ENTRYPOINT [ "java", "-jar", "api-gateway.jar" ]
EXPOSE 9002