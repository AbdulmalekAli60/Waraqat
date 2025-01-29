package com.waraqat.Waraqat.dto;

import jakarta.validation.constraints.*;

import java.sql.Timestamp;

public class UserDTO {
    @NotBlank(message = "Name should not be null")
    private String name; // not null

    @NotBlank(message = "Username should not be empty")
    private String username; // uniqe not null

    @Email(message = "Email is not valid", regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
    @NotEmpty(message = "Email should not be empty")
    private String email; // unique not null

    @NotEmpty(message = "Password should not be empty")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",message = "Password must contain: ") // todo: give regex back
    @Size(min = 6,max = 12,message = "Password must be between 6 and 12 in size")
    private String password;// not null

    private Timestamp created_at = new Timestamp(System.currentTimeMillis());

    public UserDTO() {
    }

    public UserDTO(String name, String username, String email, String password, Timestamp created_at) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }

}
