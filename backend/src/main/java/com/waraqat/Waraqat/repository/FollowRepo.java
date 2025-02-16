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

    // query
    @Query("SELECT uf.following FROM Follow uf WHERE uf.follower.id = :id")
    List<User> findAllByFollower_id(@Param("id") Long followerId);

    @Query("SELECT uf.follower FROM Follow uf WHERE uf.following.id = :id")
    List<User> findAllByFollowing_id(@Param("id") Long following_Id);

    boolean existsByFollowerIdAndFollowingId(Long followerId, Long FollowingId);

    boolean existsByFollowingId(Long followerId);
}
