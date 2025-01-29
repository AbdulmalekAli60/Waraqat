package com.waraqat.Waraqat.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "user_follows")
public class Follow {

    @EmbeddedId
    private FollowCompositeKey primaryKey;

    @ManyToOne
    @MapsId("followerId") // to the composite key
    @JoinColumn(name = "follower_id")
    private User follower;

    @ManyToOne
    @MapsId("followingId")
    @JoinColumn(name = "following_id")
    private User following;

    @Column(name = "created_at")
    private Timestamp created_at;

    public Follow() {
    }

    public Follow(FollowCompositeKey primaryKey, Timestamp created_at) {
        this.primaryKey = primaryKey;
        this.created_at = created_at;
    }

    public FollowCompositeKey getPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(FollowCompositeKey primaryKey) {
        this.primaryKey = primaryKey;
    }

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }

    @Override
    public String toString() {
        return "Follow{" +
                "primaryKey=" + primaryKey +
                ", follower=" + follower +
                ", following=" + following +
                ", created_at=" + created_at +
                '}';
    }
}
