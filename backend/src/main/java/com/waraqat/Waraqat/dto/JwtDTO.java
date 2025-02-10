package com.waraqat.Waraqat.dto;

public class JwtDTO {

    private String accessToken;
    private String tokenType = "Bearer ";
    private Object userData;


    public JwtDTO() {
    }

    public JwtDTO(String jwtToken,Object user) {
        this.accessToken = jwtToken;
        this.userData = user;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Object getUserData() {
        return userData;
    }

    public void setUserData(Object userData) {
        this.userData = userData;
    }
}
