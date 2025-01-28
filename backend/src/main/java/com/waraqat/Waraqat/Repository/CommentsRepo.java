package com.waraqat.Waraqat.Repository;

import com.waraqat.Waraqat.Entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepo extends JpaRepository<Comments,Long> {
}
