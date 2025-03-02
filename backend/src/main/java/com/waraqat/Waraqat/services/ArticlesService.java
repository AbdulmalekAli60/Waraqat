package com.waraqat.Waraqat.services;

import com.waraqat.Waraqat.dto.ArticlesDTO;
import com.waraqat.Waraqat.dto.CreateArticleDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface ArticlesService {

    ArticlesDTO createArticle(CreateArticleDTO createArticleDTO);

    List<ArticlesDTO> getAllArticles();

    Long endorse(Long id);

    ArticlesDTO getArticleWithId(Long id);

    List<ArticlesDTO> getAllArticlesByUserId(Long id);

    List<ArticlesDTO> getArticleByCategory(Long id);

    String deleteArticle(Long articleId, Long userId);
}
