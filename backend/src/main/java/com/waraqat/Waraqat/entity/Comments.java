package com.waraqat.Waraqat.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "comments")
public class Comments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Articles article; // article id

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // user id

    @ManyToOne
    @JoinColumn(name = "parent_comment_id")
    private Comments parentComment;

    @OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL)
    private Set<Comments> replies = new HashSet<>();

    @Column(name = "comment_content", columnDefinition = "TEXT")
    private String content; // text

    @Column(name = "claps_count")
    private Long claps_count;

    @Column(name = "created_at")
    private Timestamp created_at;

}
