package com.waraqat.Waraqat.services.serviceImpl;

import com.waraqat.Waraqat.dto.CommentsResponseDTO;
import com.waraqat.Waraqat.dto.WriteCommentDTO;
import com.waraqat.Waraqat.entity.Comments;
import com.waraqat.Waraqat.exceptions.Unauthorized;
import com.waraqat.Waraqat.exceptions.UserNotFoundException;
import com.waraqat.Waraqat.repository.ArticlesRepo;
import com.waraqat.Waraqat.repository.CommentsRepo;
import com.waraqat.Waraqat.repository.UserRepo;
import com.waraqat.Waraqat.services.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class CommentsServiceImpl implements CommentsService {
    private final CommentsRepo commentsRepo;
    private final UserRepo userRepo;
    private final ArticlesRepo articlesRepo;
    @Autowired
    public CommentsServiceImpl(CommentsRepo commentsRepo, UserRepo userRepo, ArticlesRepo articlesRepo) {
        this.commentsRepo = commentsRepo;
        this.userRepo = userRepo;
        this.articlesRepo = articlesRepo;
    }

    @Override
    public CommentsResponseDTO writeComment(WriteCommentDTO writeCommentDTO) {

        if (writeCommentDTO.getArticleId() == null) {
            throw new IllegalArgumentException("Article ID cannot be null");
        }
        if (writeCommentDTO.getUserId() == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }

        boolean isUser = userRepo.existsById(writeCommentDTO.getUserId());
        if(!isUser) throw new UserNotFoundException("User was not found");

        boolean isArticle = articlesRepo.existsById(writeCommentDTO.getArticleId());
        if(!isArticle) throw new IllegalArgumentException("Article was not found");

        Comments newComment = new Comments();
        newComment.setUser(userRepo.getReferenceById(writeCommentDTO.getUserId()));
        newComment.setArticle(articlesRepo.getReferenceById(writeCommentDTO.getArticleId()));
        newComment.setContent(writeCommentDTO.getContent());

        Comments savedComment = commentsRepo.save(newComment);

        return new CommentsResponseDTO(savedComment);
    }

    @Override
    public String deleteComment(Long commentId, Long userId) {
        boolean isUser = userRepo.existsById(userId);
        if(!isUser) throw new UserNotFoundException("User was not found");

        boolean isComment = commentsRepo.existsById(commentId);
        if(!isComment) throw new IllegalArgumentException("comment was not found");

        Optional<Comments> commentOptional = commentsRepo.findById(commentId);
        if(commentOptional.isEmpty())
            throw new IllegalArgumentException("Comment was not found");

        Comments comments = commentOptional.get();

        if(!comments.getUser().getId().equals(userId)){
            throw new Unauthorized("You are not authorized to delete this comment");
        }

        commentsRepo.deleteById(commentId);


        return "comment deleted successfully";
    }

    @Override
    public List<CommentsResponseDTO> getAllCommentsWithArticleId(Long articleId) {
        boolean isArticle = articlesRepo.existsById(articleId);
        if(!isArticle) throw new IllegalArgumentException("Article was not found");

        List<Comments> commentsList = commentsRepo.findByArticle_Id(articleId);
        List<CommentsResponseDTO> commentsResponseDTOList = new ArrayList<>();

        for(Comments comment : commentsList){
            CommentsResponseDTO dto = new CommentsResponseDTO(comment);
            commentsResponseDTOList.add(dto);
        }

        return commentsResponseDTOList;
    }
}
