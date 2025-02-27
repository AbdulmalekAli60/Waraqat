package com.waraqat.Waraqat.services.serviceImpl;

import com.waraqat.Waraqat.dto.ArticlesDTO;
import com.waraqat.Waraqat.dto.BookMarksDTO;
import com.waraqat.Waraqat.entity.Articles;
import com.waraqat.Waraqat.entity.BookMarks;
import com.waraqat.Waraqat.entity.BookMarksCompositeKey;
import com.waraqat.Waraqat.entity.User;
import com.waraqat.Waraqat.exceptions.UserNotFoundException;
import com.waraqat.Waraqat.repository.ArticlesRepo;
import com.waraqat.Waraqat.repository.BookMarksRepo;
import com.waraqat.Waraqat.repository.UserRepo;
import com.waraqat.Waraqat.services.BookMarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class BookMarksServiceImpl implements BookMarksService {

    private final BookMarksRepo bookMarksRepository;

    private final ArticlesRepo articlesRepository;

    private final UserRepo userRepository;
    @Autowired
    public BookMarksServiceImpl(BookMarksRepo bookMarksRepository, ArticlesRepo articlesRepository, UserRepo userRepository) {
        this.bookMarksRepository = bookMarksRepository;
        this.articlesRepository = articlesRepository;
        this.userRepository = userRepository;
    }

    @Override
    public String addToBookMarks(Long articleId, Long userId) {

        Articles article = articlesRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("Article not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        BookMarksCompositeKey key = new BookMarksCompositeKey(articleId, userId);

        BookMarks bookmark = new BookMarks();
        bookmark.setPrimaryKey(key);
        bookmark.setArticle(article);
        bookmark.setUser(user);

        // Save the bookmark
        bookMarksRepository.save(bookmark);

        return "Article bookmarked successfully";
    }

    @Override
    public String deleteBookMark(Long articleId, Long userId) {
        Articles article = articlesRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("Article not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        BookMarksCompositeKey key = new BookMarksCompositeKey(articleId, userId);

        boolean bookMarks = bookMarksRepository.existsById(key);
        if(bookMarks){
            bookMarksRepository.deleteById(key);

            return "Bookmark deleted";
        }
        throw new   IllegalArgumentException("User not found");

    }

    @Override
    public List<ArticlesDTO> getAllBookMarks(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));


        List<BookMarks> bookmarks = bookMarksRepository.findByUser_Id(userId);

        // Extract the articles from bookmarks and convert to DTOs
        List<ArticlesDTO> articlesDTOList = bookmarks.stream()
                .map(bookMark -> new ArticlesDTO(bookMark.getArticle()))
                .collect(Collectors.toList());

        return articlesDTOList;
    }
}
