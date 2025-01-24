package com.waraqat.Waraqat.Entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private Long id;

    @Column(name = "name",nullable = false,columnDefinition = "VARCHAR(255)")
    private String name; // not null

    @Column(name = "username",unique = true,nullable = false, columnDefinition = "VARCHAR(255)")
    private String username; // uniqe not null

    @Column(name = "email",unique = true,nullable = false, columnDefinition = "VARCHAR(255)")
    private String email; // unique not null

    @Column(name = "password",nullable = false, columnDefinition = "VARCHAR(255)")
    private String password;// not null

    @Column(name = "bio" ,columnDefinition = "VARCHAR(255)")
    private String bio; // null

    @Column(name = "profileImage", columnDefinition = "VARCHAR(255)")
    private String profileImage;

    @Column(name = "createdAt")
    private Timestamp createdAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", bio='" + bio + '\'' +
                ", profileImage='" + profileImage + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
