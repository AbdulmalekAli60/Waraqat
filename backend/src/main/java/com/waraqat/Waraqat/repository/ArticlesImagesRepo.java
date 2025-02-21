package com.waraqat.Waraqat.repository;

import com.waraqat.Waraqat.entity.ArticleImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticlesImagesRepo extends JpaRepository<ArticleImages,Long> {
    List<ArticleImages> findByArticleId(Long articleId);
    void deleteByArticleId(Long articleId);
}
