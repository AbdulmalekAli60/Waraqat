package com.waraqat.Waraqat.Repository;

import com.waraqat.Waraqat.Entity.Follow;
import com.waraqat.Waraqat.Entity.FollowCompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface FollowRepo extends JpaRepository<Follow, FollowCompositeKey> {
}
