package com.waraqat.Waraqat.controller;

import com.waraqat.Waraqat.dto.ArticlesDTO;
import com.waraqat.Waraqat.dto.BookMarksDTO;
import com.waraqat.Waraqat.security.CustomUserDetails;
import com.waraqat.Waraqat.services.BookMarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/bookmarks")
public class BookMarksController {

    private final BookMarksService bookMarksService;

    @Autowired
    public BookMarksController(BookMarksService bookMarksService1){
        this.bookMarksService = bookMarksService1;
    }

    @PostMapping("/add/{id}")
    public ResponseEntity<String> addBookmark(@PathVariable("id") Long articleId, @AuthenticationPrincipal CustomUserDetails userDetails){
        Long currentUser = userDetails.getId();
        String message = bookMarksService.addToBookMarks(articleId, currentUser);
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBookmark(@PathVariable("id") Long articleId, @AuthenticationPrincipal CustomUserDetails userDetails){
        Long currentUser = userDetails.getId();
        String message = bookMarksService.deleteBookMark(articleId, currentUser);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/getAllBookmarks")
    public  ResponseEntity<List<ArticlesDTO>> getAllArticles( @AuthenticationPrincipal CustomUserDetails userDetails){
        Long currentUser = userDetails.getId();
        List<ArticlesDTO> articlesDTOList = bookMarksService.getAllBookMarks(currentUser);
        return ResponseEntity.ok(articlesDTOList);
    }


}
