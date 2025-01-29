package com.waraqat.Waraqat.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "articles")
public class Articles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title",columnDefinition = "VARCHAR(255)")
    private String title;

    @Column(name = "content",columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Categories category;

    @OneToMany(mappedBy = "article",cascade = {CascadeType.PERSIST, CascadeType.MERGE,CascadeType.REMOVE})
    private Set<BookMarks> bookMarks = new HashSet<>();

    @OneToMany(mappedBy = "article",cascade = CascadeType.ALL)
    private Set<ArticleImages> articleImages = new HashSet<>();

    @OneToMany(mappedBy = "article",cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Comments> comments = new HashSet<>();

    @Column(name = "claps_count")
    private Long clapsCount;

    @Column(name = "reading_time")
    private Long readingTime;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "created_at")
    private Timestamp created_at;

    @Column(name = "updated_at")
    private Timestamp updated_at;

}
