package com.waraqat.Waraqat.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;


@EnableWebSecurity // includes @Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception { //configure the security filter chain to intercept the request before ot goes to the controller

        httpSecurity
        .csrf(csrf -> csrf.disable())
             .authorizeHttpRequests(auth -> auth
                     .requestMatchers(HttpMethod.GET).permitAll()
                     .anyRequest().authenticated()
             );
            return httpSecurity.build();
    }

}
