package com.waraqat.Waraqat.services.serviceImpl;

import com.waraqat.Waraqat.dto.ArticlesDTO;
import com.waraqat.Waraqat.dto.CreateArticleDTO;
import com.waraqat.Waraqat.dto.CreateArticleImageDTO;
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

import java.sql.Timestamp;
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

        // Handle article images
        if (createArticleDTO.getArticleImages() != null && !createArticleDTO.getArticleImages().isEmpty()) {
            Set<ArticleImages> images = new HashSet<>();
            for (CreateArticleImageDTO imageDTO : createArticleDTO.getArticleImages()) {
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
