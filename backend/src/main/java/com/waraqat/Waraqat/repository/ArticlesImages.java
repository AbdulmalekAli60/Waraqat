package com.waraqat.Waraqat.repository;

import com.waraqat.Waraqat.entity.ArticleImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticlesImages extends JpaRepository<ArticleImages,Long> {
}
