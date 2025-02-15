package com.waraqat.Waraqat.dto;

public class AllFollowDTO {

    private Long followId;

    public AllFollowDTO() {
    }

    public AllFollowDTO(Long followId) {
        this.followId = followId;
    }

    public Long getFollowId() {
        return followId;
    }

    public void setFollowId(Long followId) {
        this.followId = followId;
    }
}
