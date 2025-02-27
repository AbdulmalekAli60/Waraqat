package com.waraqat.Waraqat.services;

import com.waraqat.Waraqat.dto.ArticlesDTO;
import com.waraqat.Waraqat.dto.BookMarksDTO;
import com.waraqat.Waraqat.entity.Articles;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookMarksService {

    String addToBookMarks(Long articleId, Long userId);

    String deleteBookMark(Long articleId, Long userId);

    List<ArticlesDTO> getAllBookMarks(Long userId);
}
