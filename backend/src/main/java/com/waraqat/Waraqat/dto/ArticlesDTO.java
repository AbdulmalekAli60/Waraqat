package com.waraqat.Waraqat.dto;

import com.waraqat.Waraqat.entity.Articles;
import com.waraqat.Waraqat.entity.Comments;

import java.sql.Timestamp;
import java.util.Set;

public class ArticlesDTO {

    private Long id;
    private String title;
    private String content;
    private Long userId;
    private String userName;
    private Long categoryId;
    private String categoryName;
    private Long clapsCount;
    private Long readingTime;
    private Boolean status;
    private Timestamp createdAt;
    private Set<Comments> comments;
    private int commentsCount;

    public ArticlesDTO(Articles article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.userId = article.getUser().getId();
        this.userName = article.getUser().getName();
        this.categoryId = article.getCategory().getId();
        this.categoryName = article.getCategory().getCategoryName();
        this.clapsCount = article.getClapsCount();
        this.readingTime = article.getReadingTime();
        this.status = article.getStatus();
        this.createdAt = article.getCreated_at();
        this.comments = article.getComments();
        this.commentsCount = article.getComments().size();

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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

//    public List<String> getImageUrls() {
//        return imageUrls;
//    }
//
//    public void setImageUrls(List<String> imageUrls) {
//        this.imageUrls = imageUrls;
//    }

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

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Set<Comments> getComments() {
        return comments;
    }

    public void setComments(Set<Comments> comments) {
        this.comments = comments;
    }

    public int getCommentsCount() {
        return commentsCount;
    }

    public void setCommentsCount(int commentsCount) {
        this.commentsCount = commentsCount;
    }
}
