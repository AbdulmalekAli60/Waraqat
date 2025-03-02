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

        if(bookMarksRepository.existsById(key)) throw new IllegalArgumentException("Bookmark already exists");

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
        boolean bookMarkExists = bookMarksRepository.existsById(key);

        if (bookMarkExists) {
            bookMarksRepository.deleteById(key);
            return "Bookmark deleted";
        } else {
            // Instead of throwing an error, return a message
            return "Bookmark not found, nothing to delete";
        }
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
