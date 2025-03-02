package com.waraqat.Waraqat.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private Articles article; // article id

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
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
    private Timestamp created_at = new Timestamp(System.currentTimeMillis());

    public Comments(Long id, Articles article, User user, Comments parentComment, Set<Comments> replies, String content, Long claps_count, Timestamp created_at) {
        this.id = id;
        this.article = article;
        this.user = user;
        this.parentComment = parentComment;
        this.replies = replies;
        this.content = content;
        this.claps_count = claps_count;
    }

    public Comments() {
    }

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }

    public Long getClaps_count() {
        return claps_count;
    }

    public void setClaps_count(Long claps_count) {
        this.claps_count = claps_count;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Articles getArticle() {
        return article;
    }

    public void setArticle(Articles article) {
        this.article = article;
    }

    public Set<Comments> getReplies() {
        return replies;
    }

    public void setReplies(Set<Comments> replies) {
        this.replies = replies;
    }

    public Comments getParentComment() {
        return parentComment;
    }

    public void setParentComment(Comments parentComment) {
        this.parentComment = parentComment;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
