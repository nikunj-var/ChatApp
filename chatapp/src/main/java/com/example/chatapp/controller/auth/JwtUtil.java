package com.example.chatapp.controller.auth;

import java.util.Base64;
import java.util.Date;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


public class JwtUtil {

    
    private static final String SECRET_KEY = "4B7SHqP34XlT22fqXjtG7wSh2TrF5fLtq1dWnlNO9E0=";
    
 
    public static String generateToken(String username){
        return Jwts.builder()
        .setSubject(username)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*10))
        .signWith(SignatureAlgorithm.HS256,Base64.getDecoder().decode(SECRET_KEY))
        .compact();
    }
}
