package com.waraqat.Waraqat.Repository;

import com.waraqat.Waraqat.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface UserRepo extends JpaRepository<User,Long> {

    User findByusername(String username);
    boolean existsByEmail(String email);
}
