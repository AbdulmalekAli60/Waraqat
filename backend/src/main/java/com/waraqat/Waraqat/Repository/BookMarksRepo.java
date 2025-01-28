package com.waraqat.Waraqat.Repository;

import com.waraqat.Waraqat.Entity.BookMarks;
import com.waraqat.Waraqat.Entity.BookMarksCompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookMarksRepo extends JpaRepository<BookMarks, BookMarksCompositeKey> {
}
