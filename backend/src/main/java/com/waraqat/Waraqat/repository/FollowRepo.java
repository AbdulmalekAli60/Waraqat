package com.waraqat.Waraqat.repository;

import com.waraqat.Waraqat.entity.Follow;
import com.waraqat.Waraqat.entity.FollowCompositeKey;
import com.waraqat.Waraqat.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepo extends JpaRepository<Follow, FollowCompositeKey> {

    @Query("SELECT f.following FROM Follow f WHERE f.follower.id = :id")
    List<User> findAllByFollower_id(@Param("id") Long followerId);

    // Find all users that follow the given user
    @Query("SELECT f.follower FROM Follow f WHERE f.following.id = :id")
    List<User> findAllByFollowing_id(@Param("id") Long followingId);

    // Check if a following relationship exists
    boolean existsByFollowerIdAndFollowingId(Long followerId, Long followingId);

    boolean existsByFollowingId(Long followerId);
}
