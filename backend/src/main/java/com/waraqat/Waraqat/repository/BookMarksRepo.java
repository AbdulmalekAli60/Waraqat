package com.waraqat.Waraqat.repository;

import com.waraqat.Waraqat.entity.BookMarks;
import com.waraqat.Waraqat.entity.BookMarksCompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookMarksRepo extends JpaRepository<BookMarks, BookMarksCompositeKey> {
}
