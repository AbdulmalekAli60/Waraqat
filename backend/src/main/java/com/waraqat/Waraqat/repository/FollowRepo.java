package com.waraqat.Waraqat.repository;

import com.waraqat.Waraqat.dto.AllFollowDTO;
import com.waraqat.Waraqat.entity.Follow;
import com.waraqat.Waraqat.entity.FollowCompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface FollowRepo extends JpaRepository<Follow, FollowCompositeKey> {
    List<Follow> findAllByFollower_id(Long followerId);
    List<Follow> findAllByFollowing_id(Long following_Id);
}
