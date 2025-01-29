package com.waraqat.Waraqat.repository;

import com.waraqat.Waraqat.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface CommentsRepo extends JpaRepository<Comments,Long> {
}
