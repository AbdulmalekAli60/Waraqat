package com.waraqat.Waraqat.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;

@Embeddable
public class BookMarksCompositeKey {

    @Column(name = "article_id")
    private Long articleId;

    @Column(name = "user_id")
    private Long userId;

    public BookMarksCompositeKey() {
    }

    public Long getArticles() {
        return articleId;
    }

    public void setArticles(Long articles) {
        this.articleId = articles;
    }

    public Long getUser() {
        return userId;
    }

    public void setUser(Long user) {
        this.userId = user;
    }
}
