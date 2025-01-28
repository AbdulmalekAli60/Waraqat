package com.waraqat.Waraqat.Repository;

import com.waraqat.Waraqat.Entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface CategoriesRepo extends JpaRepository<Categories,Long> {
}
