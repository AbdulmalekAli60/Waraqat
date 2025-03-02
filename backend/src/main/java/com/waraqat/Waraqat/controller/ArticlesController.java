package com.waraqat.Waraqat.controller;

import com.waraqat.Waraqat.dto.ArticlesDTO;
import com.waraqat.Waraqat.dto.CreateArticleDTO;
import com.waraqat.Waraqat.security.CustomUserDetails;
import com.waraqat.Waraqat.services.ArticlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/getAllArticles")
    public ResponseEntity<List<ArticlesDTO>> getAllArticles(){
       List<ArticlesDTO> articlesDTOList = articlesService.getAllArticles();
       return ResponseEntity.ok(articlesDTOList);
    }

    @PostMapping("/ClapsCount/{id}")
    public ResponseEntity<Long> incrementClapsCount(@PathVariable Long id){
        Long newCount = articlesService.endorse(id);
        return ResponseEntity.ok(newCount);
    }

    @GetMapping("/getArticleWithId/{id}")
    public ResponseEntity<ArticlesDTO> getArticleWithId(@PathVariable Long id){
        ArticlesDTO articlesDTO = articlesService.getArticleWithId(id);
        return ResponseEntity.ok(articlesDTO);
    }

    @GetMapping("/getAllArticlesById/{id}")
    public ResponseEntity<List<ArticlesDTO>> getAllArticlesById(@PathVariable Long id){
        List<ArticlesDTO> articlesDTOList = articlesService.getAllArticlesByUserId(id);
        return ResponseEntity.ok(articlesDTOList);
    }

    @GetMapping("/getAllByCategoryId/{id}")
    public ResponseEntity<List<ArticlesDTO>> getAllByCategoryId(@PathVariable("id") Long categoryId){
        List<ArticlesDTO> articlesDTOList = articlesService.getArticleByCategory(categoryId);
        return ResponseEntity.ok(articlesDTOList);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteArticle(@PathVariable("id") Long articleId, @AuthenticationPrincipal CustomUserDetails userDetails){
        Long currentUser = userDetails.getId();
        String message = articlesService.deleteArticle(articleId,currentUser);
        return ResponseEntity.ok(message);
    }
}
