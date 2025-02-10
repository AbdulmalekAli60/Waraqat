package com.waraqat.Waraqat.dto;

public class EditProfileDTO {

    private Long id;
    private String name;
//    private String username; // just to get the user from repo, not to be sent back
    private String email;
    private String bio;
    private String profileImage;

    public EditProfileDTO() {
    }

    public EditProfileDTO(String name, String email, String bio, String profileImage,long Id) {
        this.name = name;
        this.email = email;
        this.bio = bio;
        this.profileImage = profileImage;
        this.id = Id;
    }

    public String getName() {
        return name;
    }

    public Long getId() {
        return id;
    }

    //    public String getUsername() {
//        return username;
//    }

    public String getEmail() {
        return email;
    }

    public String getBio() {
        return bio;
    }

    public String getProfileImage() {
        return profileImage;
    }
}
