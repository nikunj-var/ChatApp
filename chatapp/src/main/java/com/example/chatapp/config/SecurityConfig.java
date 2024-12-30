package com.example.chatapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/auth/register", "/auth/login", "/auth/oauth2/callback").permitAll()
                .anyRequest().authenticated() 
            )
            .oauth2Login(oauth2 -> oauth2
            .loginPage("/login").permitAll()
            .redirectionEndpoint(red -> red
                .baseUri("/auth/oauth2/callback")).defaultSuccessUrl("/home",true)
            )
            .formLogin(form -> form.loginPage("/login").successHandler((request, response,authentication) ->{response.setStatus(HttpServletResponse.SC_OK);}))
            .sessionManagement(session ->session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
            .httpBasic(http -> http.disable());
    
        System.out.println("\n\n\ncalled\n\n\n\n"); 
        return httpSecurity.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/auth/register", "/auth/login","/auth/oauth2/callback");
    }

}
