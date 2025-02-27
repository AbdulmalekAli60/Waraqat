package com.waraqat.Waraqat.dto;

public class BookMarksDTO {
    private Long userId;
    private Long articleId;

    public BookMarksDTO(Long userId, Long articleId) {
        this.userId = userId;
        this.articleId = articleId;
    }

    public BookMarksDTO() {
    }

    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
