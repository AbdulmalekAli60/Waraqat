package com.waraqat.Waraqat.dto;

import java.util.Set;

public class CreateArticleDTO {

    private String title;
    private String content;
    private Long userId;
    private Long categoryId;
//    private Set<CreateArticleImageDTO> articleImages;

    public CreateArticleDTO() {
    }

    public CreateArticleDTO(String title, String content, Long userId, Long categoryId, Set<CreateArticleImageDTO> articleImages) {
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.categoryId = categoryId;
//        this.articleImages = articleImages;
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

//    public Set<CreateArticleImageDTO> getArticleImages() {
//        return articleImages;
//    }
//
//    public void setArticleImages(Set<CreateArticleImageDTO> articleImages) {
//        this.articleImages = articleImages;
//    }
}
