FROM maven:3.8.4-openjdk-17 AS builder

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app

# Instalar o cliente MySQL
RUN apt-get update && apt-get install -y default-mysql-client && rm -rf /var/lib/apt/lists/*

# Copiar o script de espera
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8085

# Usar o script de espera como entrypoint
ENTRYPOINT ["/wait-for-it.sh", "db-usuario", "java", "-jar", "app.jar"]
