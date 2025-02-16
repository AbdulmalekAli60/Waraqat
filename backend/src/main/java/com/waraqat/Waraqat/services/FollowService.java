package com.waraqat.Waraqat.services;

import com.waraqat.Waraqat.dto.AllUsersDTO;
import com.waraqat.Waraqat.dto.UserFollowDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FollowService {

    String follow(Long follower_id,Long following_id);

    String unfollow(Long follower_id,Long following_id);

    List<UserFollowDTO> getFollowing(Long id);
    List<UserFollowDTO> getFollowers(Long id);

}
