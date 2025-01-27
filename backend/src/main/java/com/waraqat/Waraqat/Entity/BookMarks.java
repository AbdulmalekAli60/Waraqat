package com.waraqat.Waraqat.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bookmarks")
public class BookMarks {

    @EmbeddedId
    private BookMarksCompositeKey primaryKey;

    @ManyToOne
    @MapsId("userId")  // Maps to userId in composite key
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("articleId")  // Maps to articleId in composite key
    @JoinColumn(name = "article_id")
    private Articles article;
}
