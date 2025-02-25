package com.waraqat.Waraqat.repository;

import com.waraqat.Waraqat.entity.Articles;
import com.waraqat.Waraqat.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticlesRepo extends JpaRepository<Articles,Long> {
    Articles findArticlesById(Long id);
    List<Articles> findAllByUser_id(Long id);

    List<Articles> findAllByCategoryId(Long id);

}
