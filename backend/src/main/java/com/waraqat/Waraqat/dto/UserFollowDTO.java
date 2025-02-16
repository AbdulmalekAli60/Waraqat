package com.waraqat.Waraqat.dto;

import com.waraqat.Waraqat.entity.User;

public class UserFollowDTO {
    private Long userId;
    private String username;
    private String name;
    private String profileImage;
    private boolean isFollowing;

    public UserFollowDTO(User user, boolean isfollow) {
        this.userId = user.getId();
        this.username = user.getUsername();
        this.name = user.getName();
        this.profileImage = user.getProfileImage();
        this.isFollowing = isfollow;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public boolean isFollowing() {
        return isFollowing;
    }

    public void setFollowing(boolean following) {
        isFollowing = following;
    }
}
