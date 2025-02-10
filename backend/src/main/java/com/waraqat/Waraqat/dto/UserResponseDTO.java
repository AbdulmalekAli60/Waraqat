package com.waraqat.Waraqat.dto;

import com.waraqat.Waraqat.entity.Articles;
import com.waraqat.Waraqat.entity.Follow;
import com.waraqat.Waraqat.entity.User;
import com.waraqat.Waraqat.entity.UserSocialMedia;

import java.sql.Timestamp;
import java.util.Set;
public class UserResponseDTO {

    private Long id;
    private String name;
    private String username;
    private String email;
    private String bio;
    private String profileImage;
    private Timestamp created_at;

    public UserResponseDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.bio = user.getBio();
        this.profileImage = user.getProfileImage();
        this.created_at = user.getCreated_at();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getBio() {
        return bio;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public Timestamp getCreated_at() {
        return created_at;
    }
}
