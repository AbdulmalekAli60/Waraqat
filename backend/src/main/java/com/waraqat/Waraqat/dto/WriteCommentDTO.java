package com.waraqat.Waraqat.dto;

import java.sql.Timestamp;

public class WriteCommentDTO {
    private Long articleId;
    private Long userId;
    private String content;
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());
    private Long userIdOnly;

    public WriteCommentDTO(Long articleId, Long userId, String content, Timestamp createdAt,Long userId1) {
        this.articleId = articleId;
        this.userId = userId;
        this.content = content;
        this.userIdOnly = userId1;
    }

    public WriteCommentDTO() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public String getContent() {
        return content;
    }

    public Long getUserIdOnly() {
        return userIdOnly;
    }

    public void setUserIdOnly(Long userIdOnly) {
        this.userIdOnly = userIdOnly;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }
}
