package com.waraqat.Waraqat.controller;

import com.waraqat.Waraqat.dto.ArticlesDTO;
import com.waraqat.Waraqat.dto.CreateArticleDTO;
import com.waraqat.Waraqat.services.ArticlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/articles")
@CrossOrigin("*")
public class ArticlesController {

    private final ArticlesService articlesService;

    @Autowired
    public ArticlesController(ArticlesService articlesService1){
        this.articlesService = articlesService1;
    }

    @PostMapping("/createArticle")
    public ResponseEntity<ArticlesDTO> createNewArticle(@RequestBody CreateArticleDTO createArticleDTO){
        ArticlesDTO dto = articlesService.createArticle(createArticleDTO);
        return ResponseEntity.ok(dto);
    }
}
