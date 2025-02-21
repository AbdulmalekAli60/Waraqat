package com.waraqat.Waraqat.services;

import com.waraqat.Waraqat.dto.ArticlesDTO;
import org.springframework.stereotype.Service;

@Service
public interface ArticlesService {

    ArticlesDTO createArticle(ArticlesDTO articlesDTO);


    // get article with id
    // get article based on category
}
