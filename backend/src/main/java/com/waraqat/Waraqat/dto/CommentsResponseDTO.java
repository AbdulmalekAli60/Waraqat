package com.waraqat.Waraqat.dto;

import com.waraqat.Waraqat.entity.Comments;

import java.sql.Timestamp;

public class CommentsResponseDTO {

        private Long id;
        private Long userId;
        private Long articleId;
        private Long parentCommentId;
        private String content;
        private Long clapsCount;
        private Timestamp createdAt;
        private String profileImage;
        private String username;


        public CommentsResponseDTO(Comments comment) {
            this.id = comment.getId();
            this.userId = comment.getUser() != null ? comment.getUser().getId() : null;
            this.articleId = comment.getArticle() != null ? comment.getArticle().getId() : null;
            this.parentCommentId = comment.getParentComment() != null ? comment.getParentComment().getId() : null;
            this.content = comment.getContent();
            this.clapsCount = comment.getClaps_count();
            this.createdAt = comment.getCreated_at();
            this.profileImage = comment.getUser().getProfileImage();
            this.username = comment.getUser().getUsername();
        }

        public CommentsResponseDTO() {
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public Timestamp getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(Timestamp createdAt) {
            this.createdAt = createdAt;
        }

        public Long getClapsCount() {
            return clapsCount;
        }

        public void setClapsCount(Long clapsCount) {
            this.clapsCount = clapsCount;
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

        public Long getArticleId() {
            return articleId;
        }

        public void setArticleId(Long articleId) {
            this.articleId = articleId;
        }

        public Long getParentCommentId() {
            return parentCommentId;
        }

        public void setParentCommentId(Long parentCommentId) {
            this.parentCommentId = parentCommentId;
        }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}

