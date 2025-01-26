package com.waraqat.Waraqat.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class FollowCompositeKey implements Serializable {

    @Column(name = "follower_id",nullable = false) // who follow me
    private User follower_id;

    @Column(name = "following_id",nullable = false) // who I follow
    private User following_id;

    public FollowCompositeKey() {
    }

    public FollowCompositeKey(User follower_id, User following_id) {
        this.follower_id = follower_id;
        this.following_id = following_id;
    }

    public User getFollowing_id() {
        return following_id;
    }

    public void setFollowing_id(User following_id) {
        this.following_id = following_id;
    }

    public User getFollower_id() {
        return follower_id;
    }

    public void setFollower_id(User follower_id) {
        this.follower_id = follower_id;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        FollowCompositeKey that = (FollowCompositeKey) o;
        return Objects.equals(follower_id, that.follower_id) && Objects.equals(following_id, that.following_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(follower_id, following_id);
    }
}
