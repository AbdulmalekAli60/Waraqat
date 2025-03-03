package com.waraqat.Waraqat.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class FollowCompositeKey implements Serializable {

    @Column(name = "follower_id",nullable = false) // who follow me
    private Long followerId;

    @Column(name = "following_id",nullable = false) // who I follow
    private Long followingId;

    public FollowCompositeKey() {
    }

    public FollowCompositeKey(Long followerId, Long followingId) {
        this.followerId = followerId;
        this.followingId = followingId;
    }

    public Long getFollowerId() {
        return followerId;
    }

    public void setFollowerId(Long followerId) {
        this.followerId = followerId;
    }

    public Long getFollowingId() {
        return followingId;
    }

    public void setFollowingId(Long followingId) {
        this.followingId = followingId;
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}
