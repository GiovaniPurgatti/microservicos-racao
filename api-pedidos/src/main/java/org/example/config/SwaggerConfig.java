package org.example.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de Pedidos")
                        .version("1.0")
                        .description("API para gerenciamento de pedidos")
                        .contact(new Contact()
                                .name("Equipe de Desenvolvimento")
                                .email("contato@exemplo.com")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8082")
                                .description("Servidor Local")
                ));
    }
} 