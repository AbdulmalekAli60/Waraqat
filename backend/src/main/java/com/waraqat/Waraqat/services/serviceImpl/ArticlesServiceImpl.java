package com.waraqat.Waraqat.services.serviceImpl;

import com.waraqat.Waraqat.dto.ArticlesDTO;
import com.waraqat.Waraqat.entity.ArticleImages;
import com.waraqat.Waraqat.entity.Articles;
import com.waraqat.Waraqat.entity.Categories;
import com.waraqat.Waraqat.entity.User;
import com.waraqat.Waraqat.exceptions.UserNotFoundException;
import com.waraqat.Waraqat.repository.ArticlesImagesRepo;
import com.waraqat.Waraqat.repository.ArticlesRepo;
import com.waraqat.Waraqat.repository.CategoriesRepo;
import com.waraqat.Waraqat.repository.UserRepo;
import com.waraqat.Waraqat.services.ArticlesService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.StringTokenizer;

@Component
public class ArticlesServiceImpl implements ArticlesService {

    private final UserRepo userRepo;
    private final CategoriesRepo categoriesRepo;
    private final ArticlesRepo articlesRepo;
    private final ArticlesImagesRepo articlesImagesRepo;

    @Autowired
    public ArticlesServiceImpl(UserRepo userRepo, CategoriesRepo categoriesRepo, ArticlesRepo articlesRepo,ArticlesImagesRepo articlesImagesRepo1) {
        this.userRepo = userRepo;
        this.categoriesRepo = categoriesRepo;
        this.articlesRepo = articlesRepo;
        this.articlesImagesRepo = articlesImagesRepo1;
    }


    @Override
    @Transactional
    public ArticlesDTO createArticle(ArticlesDTO articlesDTO) {

        Articles newArticle = new Articles();
        newArticle.setTitle(articlesDTO.getTitle());
        newArticle.setContent(articlesDTO.getContent());
        newArticle.setClapsCount(articlesDTO.getClapsCount());
        newArticle.setReadingTime(calculateReadingTime(articlesDTO.getContent()));
        newArticle.setStatus(articlesDTO.isStatus());


        User userReference = userRepo.getReferenceById(articlesDTO.getUserId());
        if(userReference == null) throw new UserNotFoundException("user not found");

        Categories categoryReference = categoriesRepo.getReferenceById(articlesDTO.getCategoryId());
        if(categoryReference == null) throw new UserNotFoundException("category not found");

        newArticle.setUser(userReference);
        newArticle.setCategory(categoryReference);


        Articles savedArticle = articlesRepo.save(newArticle);

        // Handle article images
        if (articlesDTO.getArticleImages() != null && !articlesDTO.getArticleImages().isEmpty()) {
            Set<ArticleImages> images = new HashSet<>();
            for (ArticleImages imageDTO : articlesDTO.getArticleImages()) {
                ArticleImages image = new ArticleImages(imageDTO.getImageURL());
                image.setArticle(savedArticle);
                images.add(image);
            }
            articlesImagesRepo.saveAll(images);
            savedArticle.setArticleImages(images);
        }

        return new ArticlesDTO(savedArticle);
    }

    private Long calculateReadingTime(String text){
        final int averageWordsPerMinute = 225;

        int wordsCount = text.trim().split("\\s+").length;

        Long readingTime = Math.max(1L, (long) Math.ceil((double) wordsCount / averageWordsPerMinute));
        return readingTime;
    }
}
