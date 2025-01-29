package com.waraqat.Waraqat.repository;

import com.waraqat.Waraqat.entity.Follow;
import com.waraqat.Waraqat.entity.FollowCompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface FollowRepo extends JpaRepository<Follow, FollowCompositeKey> {
}
