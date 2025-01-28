package com.waraqat.Waraqat.Repository;

import com.waraqat.Waraqat.Entity.Follow;
import com.waraqat.Waraqat.Entity.FollowCompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepo extends JpaRepository<Follow, FollowCompositeKey> {
}
