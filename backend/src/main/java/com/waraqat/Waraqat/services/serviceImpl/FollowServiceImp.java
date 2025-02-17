package com.waraqat.Waraqat.services.serviceImpl;

import com.waraqat.Waraqat.dto.UserFollowDTO;
import com.waraqat.Waraqat.entity.Follow;
import com.waraqat.Waraqat.entity.FollowCompositeKey;
import com.waraqat.Waraqat.entity.User;
import com.waraqat.Waraqat.exceptions.UserNotFoundException;
import com.waraqat.Waraqat.repository.FollowRepo;
import com.waraqat.Waraqat.repository.UserRepo;
import com.waraqat.Waraqat.services.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FollowServiceImp implements FollowService {
    private final UserRepo userRepo;
    private final FollowRepo followRepo;

    @Autowired
    public FollowServiceImp(UserRepo repo, FollowRepo followRepo) {
        this.userRepo = repo;
        this.followRepo = followRepo;
    }

    @Override
    public String follow(Long follower_id, Long following_id) {
        User follower = userRepo.findUserById(follower_id);
        if (follower == null) {
            throw new UserNotFoundException("follower user does not exist");
        }

        User following = userRepo.findUserById(following_id);
        if (following == null) { // Fixed the null check
            throw new UserNotFoundException("following user does not exist");
        }

        if (follower_id.equals(following_id)) {
            throw new IllegalArgumentException("User cant follow himself");
        }

        FollowCompositeKey key = new FollowCompositeKey(follower_id, following_id);
        if (followRepo.existsById(key)) {
            throw new IllegalArgumentException("You are already following this user");
        }

        Follow follow = new Follow();
        follow.setPrimaryKey(key);
        follow.setFollower(follower);
        follow.setFollowing(following);

        followRepo.save(follow);
        return "Done! followed";
    }

    @Override
    public String unfollow(Long follower_id, Long following_id) {
        FollowCompositeKey key = new FollowCompositeKey(follower_id, following_id);

        if (!followRepo.existsById(key)) {
            throw new IllegalStateException("Not following this user");
        }

        followRepo.deleteById(key);
        return "Done! unfollowed";
    }

    @Override
    public List<UserFollowDTO> getFollowing(Long id) {
        // Get all users that the current user follows
        List<User> following = followRepo.findAllByFollower_id(id);
        List<UserFollowDTO> followingDTOs = new ArrayList<>();

        for (User user : following) {
            UserFollowDTO dto = new UserFollowDTO(
                    user,
                    true // They are always following since this is the following list
            );
            followingDTOs.add(dto);
        }

        return followingDTOs;
    }

    @Override
    public List<UserFollowDTO> getFollowers(Long id) {
        // Get all users that follow the current user
        List<User> followers = followRepo.findAllByFollowing_id(id);
        List<UserFollowDTO> followerDTOs = new ArrayList<>();

        for (User user : followers) {
            // Check if the current user follows back their followers
            boolean isFollowingBack = followRepo.existsByFollowerIdAndFollowingId(id, user.getId());
            UserFollowDTO dto = new UserFollowDTO(user, isFollowingBack);
            followerDTOs.add(dto);
        }

        return followerDTOs;
    }
}
