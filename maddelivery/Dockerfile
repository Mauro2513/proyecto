# Etapa 1: Construcción
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copia el pom.xml primero para aprovechar el cache de Docker
COPY pom.xml .

# Copia el código fuente
COPY src src

# Compila la aplicación usando Maven del sistema
RUN apk add --no-cache maven && \
    mvn clean package -DskipTests

# Etapa 2: Imagen de ejecución (más ligera)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copia el JAR compilado desde la etapa de build
COPY --from=build /app/target/*.jar app.jar

# Expone el puerto 8080
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]