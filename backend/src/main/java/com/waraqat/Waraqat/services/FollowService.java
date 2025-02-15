package com.waraqat.Waraqat.services;

import org.springframework.stereotype.Service;

@Service
public interface FollowService {

    String follow(Long follower_id,Long following_id);

    String unfollow(Long follower_id,Long following_id);

}
