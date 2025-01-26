package com.waraqat.Waraqat.Repository;

import com.waraqat.Waraqat.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Long> {
}
