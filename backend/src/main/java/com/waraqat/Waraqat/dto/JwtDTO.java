package com.waraqat.Waraqat.dto;

public class JwtDTO {

    private String accessToken;
    private String tokenType = "Bearer ";


    public JwtDTO() {
    }

    public JwtDTO(String jwtToken) {
        accessToken = jwtToken;
    }

    public String getJwtToken() {
        return accessToken;
    }

    public void setJwtToken(String jwtToken) {
        accessToken = jwtToken;
    }

    public String getTokenType() {
        return tokenType;
    }
}
