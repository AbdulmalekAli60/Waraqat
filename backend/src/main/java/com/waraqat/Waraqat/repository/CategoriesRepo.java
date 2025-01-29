package com.waraqat.Waraqat.repository;

import com.waraqat.Waraqat.entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface CategoriesRepo extends JpaRepository<Categories,Long> {
}
