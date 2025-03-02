package com.waraqat.Waraqat.services.serviceImpl;

import com.waraqat.Waraqat.dto.ArticlesDTO;
import com.waraqat.Waraqat.dto.CreateArticleDTO;
import com.waraqat.Waraqat.entity.Articles;
import com.waraqat.Waraqat.entity.Categories;
import com.waraqat.Waraqat.entity.User;
import com.waraqat.Waraqat.exceptions.UserNotFoundException;
import com.waraqat.Waraqat.repository.ArticlesRepo;
import com.waraqat.Waraqat.repository.CategoriesRepo;
import com.waraqat.Waraqat.repository.UserRepo;
import com.waraqat.Waraqat.security.CustomUserDetails;
import com.waraqat.Waraqat.services.ArticlesService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Component
public class ArticlesServiceImpl implements ArticlesService {

    private final UserRepo userRepo;
    private final CategoriesRepo categoriesRepo;
    private final ArticlesRepo articlesRepo;
//    private Long currentUser = getCurrentUserId();
    @Autowired
    public ArticlesServiceImpl(UserRepo userRepo, CategoriesRepo categoriesRepo, ArticlesRepo articlesRepo) {
        this.userRepo = userRepo;
        this.categoriesRepo = categoriesRepo;
        this.articlesRepo = articlesRepo;

    }


    @Override
    @Transactional
    public ArticlesDTO createArticle(CreateArticleDTO createArticleDTO) {
        Articles newArticle = new Articles();
        newArticle.setTitle(createArticleDTO.getTitle());
        newArticle.setContent(createArticleDTO.getContent());
        newArticle.setClapsCount(0L); // initial 0
        newArticle.setReadingTime(calculateReadingTime(createArticleDTO.getContent()));
        newArticle.setStatus(true); // Set default status


        newArticle.setCreated_at(new Timestamp(System.currentTimeMillis()));

        User userReference = userRepo.getReferenceById(createArticleDTO.getUserId());
        if(userReference == null) throw new UserNotFoundException("User not found");

        Categories categoryReference = categoriesRepo.getReferenceById(createArticleDTO.getCategoryId());
        if(categoryReference == null) throw new UserNotFoundException("Category not found");

        newArticle.setUser(userReference);
        newArticle.setCategory(categoryReference);

        Articles savedArticle = articlesRepo.save(newArticle);

        return new ArticlesDTO(savedArticle);
    }

    @Override
    public List<ArticlesDTO> getAllArticles() {
        List<Articles> allArticles = articlesRepo.findAll();
        List<ArticlesDTO> allArticlesDTO = new ArrayList<>();

        for(Articles article : allArticles ){
            ArticlesDTO dto = new ArticlesDTO(article);
            allArticlesDTO.add(dto);
        }

        return allArticlesDTO;
    }

    @Override
    public Long endorse(Long id) {
        Articles articles = articlesRepo.findArticlesById(id);
//        Long currentCount = articles.getClapsCount();
        articles.setClapsCount(articles.getClapsCount() + 1);
        articlesRepo.save(articles);
        return articles.getClapsCount() ;
    }

    @Override
    public ArticlesDTO getArticleWithId(Long id) {
        Articles articles = articlesRepo.findArticlesById(id);

        return new ArticlesDTO(articles);
    }

    @Override
    public List<ArticlesDTO> getAllArticlesByUserId(Long id) {
        List<Articles> articlesList = articlesRepo.findAllByUser_id(id);
        List<ArticlesDTO> articlesDTOList = new ArrayList<>();

        for(Articles articles : articlesList){
            ArticlesDTO dto = new ArticlesDTO(articles);
            articlesDTOList.add(dto);
        }
        return articlesDTOList;
    }

    @Override
    public List<ArticlesDTO> getArticleByCategory(Long categoryId) {
        List<Articles> articlesList;

        //All categories
        if (categoryId == 0) {
            articlesList = articlesRepo.findAll();
        } else {
            articlesList = articlesRepo.findAllByCategoryId(categoryId);
        }


        if (articlesList.isEmpty()) {
            throw new UserNotFoundException("There are no articles" +
                    (categoryId == 0 ? "" : " with category ID: " + categoryId));
        }

        // Convert to dto
        List<ArticlesDTO> articlesDTOList = new ArrayList<>();
        for (Articles articles : articlesList) {
            ArticlesDTO dto = new ArticlesDTO(articles);
            articlesDTOList.add(dto);
        }

        return articlesDTOList;
    }

    @Override
    public String deleteArticle(Long articleId,Long userId) {
        boolean isUser = userRepo.existsById(userId);
        if(!isUser) throw new UserNotFoundException("user not found");

        boolean isArticle = articlesRepo.existsById(articleId);
        if(!isArticle) throw new IllegalArgumentException("Article not found");

        articlesRepo.deleteById(articleId);

        return "Article was deleted";
    }


    private Long calculateReadingTime(String text){
        final int averageWordsPerMinute = 225;

        int wordsCount = text.trim().split("\\s+").length;

        Long readingTime = Math.max(1L, (long) Math.ceil((double) wordsCount / averageWordsPerMinute));
        return readingTime;
    }


    // Helper method to get current user ID
//    private Long getCurrentUserId() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
//            return ((CustomUserDetails) authentication.getPrincipal()).getId();
//        }
//        return null; // Or handle anonymous users appropriately
//    }
}
