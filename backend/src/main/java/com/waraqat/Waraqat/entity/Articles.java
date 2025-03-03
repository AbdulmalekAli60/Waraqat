package com.waraqat.Waraqat.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name = "content",columnDefinition = "LONGTEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Categories category;

    @OneToMany(mappedBy = "article",cascade = {CascadeType.PERSIST, CascadeType.MERGE,CascadeType.REMOVE})
    @JsonIgnore
    private Set<BookMarks> bookMarks = new HashSet<>();

    @OneToMany(mappedBy = "article",cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Comments> comments = new HashSet<>();

    @Column(name = "claps_count")
    private Long clapsCount;

    @Column(name = "reading_time")
    private Long readingTime;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "created_at")
    private Timestamp created_at = new Timestamp(System.currentTimeMillis());

    @Column(name = "updated_at")
    private Timestamp updated_at;

    public Articles() {
    }

    public Articles(Long id, String title, String content, User user, Categories category, Set<BookMarks> bookMarks,  Set<Comments> comments, Long clapsCount, Long readingTime, Boolean status, Timestamp created_at, Timestamp updated_at) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.user = user;
        this.category = category;
        this.bookMarks = bookMarks;
        this.comments = comments;
        this.clapsCount = clapsCount;
        this.readingTime = readingTime;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    public Articles(Long id, String title, String content, User user, Categories category,  Long clapsCount, Long readingTime, Boolean status) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.user = user;
        this.category = category;
        this.clapsCount = clapsCount;
        this.readingTime = readingTime;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Categories getCategory() {
        return category;
    }

    public void setCategory(Categories category) {
        this.category = category;
    }

    public Set<BookMarks> getBookMarks() {
        return bookMarks;
    }

    public void setBookMarks(Set<BookMarks> bookMarks) {
        this.bookMarks = bookMarks;
    }

    public Set<Comments> getComments() {
        return comments;
    }

    public void setComments(Set<Comments> comments) {
        this.comments = comments;
    }

    public Long getClapsCount() {
        return clapsCount;
    }

    public void setClapsCount(Long clapsCount) {
        this.clapsCount = clapsCount;
    }

    public Long getReadingTime() {
        return readingTime;
    }

    public void setReadingTime(Long readingTime) {
        this.readingTime = readingTime;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }

    public Timestamp getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Timestamp updated_at) {
        this.updated_at = updated_at;
    }
}
