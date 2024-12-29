package com.example.chatapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.authorizeHttpRequests(authz -> authz.requestMatchers("/register","/login","/auth/oauth2/callback").permitAll().anyRequest().authenticated()).oauth2Login(oauth2->oauth2.loginPage("/login").permitAll().redirectionEndpoint().baseUri("/auth/oauth2/callback"));
        System.out.println("\n\n\ncalled\n\n\n\n");
        return httpSecurity.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/register", "/login","/auth/oauth2/callback");
    }

}
