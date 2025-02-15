package com.waraqat.Waraqat.services;

import com.waraqat.Waraqat.dto.AllFollowDTO;
import com.waraqat.Waraqat.entity.Follow;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FollowService {

    String follow(Long follower_id,Long following_id);

    String unfollow(Long follower_id,Long following_id);

    List<AllFollowDTO> getFollowers(Long id);
    List<AllFollowDTO> getFollowing(Long id);

}
