package com.waraqat.Waraqat.services;

import com.waraqat.Waraqat.dto.ArticlesDTO;
import com.waraqat.Waraqat.dto.CreateArticleDTO;
import org.springframework.stereotype.Service;

@Service
public interface ArticlesService {

    ArticlesDTO createArticle(CreateArticleDTO createArticleDTO);


    // get article with id
    // get article based on category
}
