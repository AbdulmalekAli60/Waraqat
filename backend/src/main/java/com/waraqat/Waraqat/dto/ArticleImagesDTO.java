package com.waraqat.Waraqat.dto;

import com.waraqat.Waraqat.entity.ArticleImages;

public class ArticleImagesDTO {

    private Long id;
    private String imageURL;

    public ArticleImagesDTO() {}

    public ArticleImagesDTO(ArticleImages articleImage) {
        this.id = articleImage.getId();
        this.imageURL = articleImage.getImageURL();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }
}
