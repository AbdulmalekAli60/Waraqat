package com.waraqat.Waraqat.controller;

import com.waraqat.Waraqat.dto.CommentsResponseDTO;
import com.waraqat.Waraqat.dto.WriteCommentDTO;
import com.waraqat.Waraqat.entity.Comments;
import com.waraqat.Waraqat.security.CustomUserDetails;
import com.waraqat.Waraqat.services.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/comments")
public class CommentsController {
    private  final  CommentsService commentsService;

    @Autowired
    public CommentsController(CommentsService commentsService) {
        this.commentsService = commentsService;
    }

    @PostMapping("/addComment")
    public ResponseEntity<CommentsResponseDTO> writeNewComment(@RequestBody WriteCommentDTO writeCommentDTO){
        CommentsResponseDTO newComment = commentsService.writeComment(writeCommentDTO);
        return ResponseEntity.ok(newComment);
    }

    @DeleteMapping("/deleteComment/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable("id") Long commentId, @AuthenticationPrincipal CustomUserDetails customUserDetails){
        Long currentUser = customUserDetails.getId();
        String message = commentsService.deleteComment(commentId,currentUser);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/getAllComments/{id}") // for one article
    public ResponseEntity<List<CommentsResponseDTO>> getAllCommentsByArticleId(@PathVariable("id") Long articleId){
        List<CommentsResponseDTO> commentsResponseDTOList = commentsService.getAllCommentsWithArticleId(articleId);
        return ResponseEntity.ok(commentsResponseDTOList);
    }
}
