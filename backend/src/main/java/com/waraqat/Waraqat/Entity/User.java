package com.waraqat.Waraqat.Entity;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column(name = "created_at")
    private Timestamp created_at;

    @OneToMany(mappedBy = "follower" ,cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Follow> follower;

    @OneToMany(mappedBy = "following",cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Follow> following;

    @OneToMany(mappedBy = "user" ,cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<UserSocialMedia> userSocialMedia;

    @OneToMany(mappedBy = "user" ,cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Articles> articles;

    public User() {
    }

    public User(Long id, String name, String username, String email, String password, String bio, String profileImage, Timestamp created_at, Set<Follow> follower, Set<Follow> following, Set<UserSocialMedia> userSocialMedia, Set<Articles> articles) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.bio = bio;
        this.profileImage = profileImage;
        this.created_at = created_at;
        this.follower = follower;
        this.following = following;
        this.userSocialMedia = userSocialMedia;
        this.articles = articles;
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

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }

    public Set<Follow> getFollower() {
        return follower;
    }

    public void setFollower(Set<Follow> follower) {
        this.follower = follower;
    }

    public Set<Follow> getFollowing() {
        return following;
    }

    public void setFollowing(Set<Follow> following) {
        this.following = following;
    }

    public Set<UserSocialMedia> getUserSocialMedia() {
        return userSocialMedia;
    }

    public void setUserSocialMedia(Set<UserSocialMedia> userSocialMedia) {
        this.userSocialMedia = userSocialMedia;
    }

    public Set<Articles> getArticles() {
        return articles;
    }

    public void setArticles(Set<Articles> articles) {
        this.articles = articles;
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
                ", created_at=" + created_at +
                ", follower=" + follower +
                ", following=" + following +
                ", userSocialMedia=" + userSocialMedia +
                ", articles=" + articles +
                '}';
    }
}
