package com.waraqat.Waraqat.repository;

import com.waraqat.Waraqat.entity.Articles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticlesRepo extends JpaRepository<Articles,Long> {
}
