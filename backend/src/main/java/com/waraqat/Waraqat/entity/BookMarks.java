package com.waraqat.Waraqat.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "bookmarks")
public class BookMarks {

    @EmbeddedId
    private BookMarksCompositeKey primaryKey;

    @ManyToOne
    @MapsId("userId")  // Maps to userId in composite key
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @MapsId("articleId")  // Maps to articleId in composite key
    @JoinColumn(name = "article_id")
    @JsonIgnore
    private Articles article;

    public BookMarks() {
    }

    public BookMarks(BookMarksCompositeKey primaryKey) {
        this.primaryKey = primaryKey;
    }

    public BookMarksCompositeKey getPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(BookMarksCompositeKey primaryKey) {
        this.primaryKey = primaryKey;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Articles getArticle() {
        return article;
    }

    public void setArticle(Articles article) {
        this.article = article;
    }
}
