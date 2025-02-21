package com.waraqat.Waraqat.dto;

import com.waraqat.Waraqat.entity.ArticleImages;
import com.waraqat.Waraqat.entity.Articles;
import com.waraqat.Waraqat.entity.Comments;
import com.waraqat.Waraqat.entity.User;

import java.sql.Timestamp;
import java.util.Set;

public class ArticlesDTO {

    private Long ArticleId;
    private String title;
    private String content;
    private Long userId;
    private Long categoryId; // not field by the user manually
    private Set<ArticleImages> articleImages;
    private Set<Comments> comments;
    private Long clapsCount;
    private Long readingTime;
    private boolean status;
    private Timestamp created_at = new Timestamp(System.currentTimeMillis());  //add it when before saving;
//    private Timestamp updated_at; add it before saving


    public ArticlesDTO() {
    }

    public ArticlesDTO(Articles article) {
        this.ArticleId = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.userId = article.getUser().getId();
        this.categoryId = article.getCategory().getId();
        this.articleImages = article.getArticleImages();
        this.comments = article.getComments();
        this.clapsCount = article.getClapsCount();
        this.readingTime = article.getReadingTime();
        this.status = article.getStatus();
    }

    public Long getArticleId() {
        return ArticleId;
    }

    public void setArticleId(Long articleId) {
        ArticleId = articleId;
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

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Set<ArticleImages> getArticleImages() {
        return articleImages;
    }

    public void setArticleImages(Set<ArticleImages> articleImages) {
        this.articleImages = articleImages;
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

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
