package com.waraqat.Waraqat.repository;

import com.waraqat.Waraqat.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface UserRepo extends JpaRepository<User,Long> {

    User findByusername(String username);
    boolean existsByEmail(String email);
}
