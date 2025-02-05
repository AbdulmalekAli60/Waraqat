package com.waraqat.Waraqat.services.serviceImpl;

import com.waraqat.Waraqat.services.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtServiceImpl implements JwtService {

    @Value("${app.jwt-secret}")
    private String JWTSecret;

    @Value("${app.jwt-expiration-milliseconds}")
    private  Long JWTExpiration;

    @Override
    public String generateToken(String username){

        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + JWTExpiration);

        String token = Jwts.builder()
                .setHeader(Map.of("typ","JWT"))
                .setSubject(username)
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .signWith(getSigninKey(),SignatureAlgorithm.HS256)
                .compact();

        return token;
    }

    private Key getSigninKey() {
        System.out.println("JWT Secret " + JWTSecret);
        byte[] keyBytes = Decoders.BASE64.decode(JWTSecret); // Use correct variable name
        return Keys.hmacShaKeyFor(keyBytes);
    }

    @Override
    public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    @Override
    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    @Override
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    @Override
    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigninKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    @Override
    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    @Override
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
