FROM maven:3.8.4-openjdk-17 AS builder

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn package

FROM openjdk:17-jdk-slim

WORKDIR /app
COPY --from=builder /app/target/*.jar ./app.jar

EXPOSE 8081
CMD ["java", "-jar", "app.jar"]
