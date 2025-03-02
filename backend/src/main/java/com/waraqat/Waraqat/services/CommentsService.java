package com.waraqat.Waraqat.services;

import com.waraqat.Waraqat.dto.CommentsResponseDTO;
import com.waraqat.Waraqat.dto.WriteCommentDTO;
import com.waraqat.Waraqat.entity.Comments;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentsService {

    CommentsResponseDTO writeComment(WriteCommentDTO writeCommentDTO);

    String deleteComment(Long commentId,Long userId);

    List<CommentsResponseDTO> getAllCommentsWithArticleId(Long articleId);
}
