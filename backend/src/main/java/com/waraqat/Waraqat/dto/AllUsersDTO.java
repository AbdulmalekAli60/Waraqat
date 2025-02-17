package com.waraqat.Waraqat.dto;

import com.waraqat.Waraqat.entity.Follow;
import com.waraqat.Waraqat.entity.User;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

public class AllUsersDTO {
    private Long id;
    private String name;
    private String username;
//    private String bio;
    private String profileImage;
    private Timestamp createdAt;
    private boolean doIFollowThisUser;
    private Set<Follow> following;
    private Set<Follow> followers;


    public AllUsersDTO(User user, boolean isUser) {
        this.id = user.getId();
        this.name = user.getName();
        this.username = user.getUsername();
//        this.bio = user.getBio();
        this.profileImage = user.getProfileImage();
        this.createdAt = user. getCreated_at();
        this.doIFollowThisUser = isUser;
    }

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

//    public String getBio() {
//        return bio;
//    }
//
//    public void setBio(String bio) {
//        this.bio = bio;
//    }

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

    public boolean isDoIFollowThisUser() {
        return doIFollowThisUser;
    }

    public void setDoIFollowThisUser(boolean doIFollowThisUser) {
        this.doIFollowThisUser = doIFollowThisUser;
    }
}
