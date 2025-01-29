package com.waraqat.Waraqat.repository;

import com.waraqat.Waraqat.entity.UserSocialMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface UserSocialMediaRepo extends JpaRepository<UserSocialMedia,Long> {
}
