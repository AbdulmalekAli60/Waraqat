package com.waraqat.Waraqat.Repository;

import com.waraqat.Waraqat.Entity.UserSocialMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface UserSocialMediaRepo extends JpaRepository<UserSocialMedia,Long> {
}
