package com.waraqat.Waraqat.repository;

import com.waraqat.Waraqat.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface CommentsRepo extends JpaRepository<Comments,Long> {

    List<Comments> findByArticle_Id(Long articleId);
}
