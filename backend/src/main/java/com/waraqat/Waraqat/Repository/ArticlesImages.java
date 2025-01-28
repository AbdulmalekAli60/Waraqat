package com.waraqat.Waraqat.Repository;

import com.waraqat.Waraqat.Entity.ArticleImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticlesImages extends JpaRepository<ArticleImages,Long> {
}
