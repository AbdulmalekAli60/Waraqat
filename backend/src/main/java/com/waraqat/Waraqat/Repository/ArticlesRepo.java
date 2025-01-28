package com.waraqat.Waraqat.Repository;

import com.waraqat.Waraqat.Entity.Articles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticlesRepo extends JpaRepository<Articles,Long> {
}
