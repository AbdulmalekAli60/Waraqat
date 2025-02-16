package com.waraqat.Waraqat.services.serviceImpl;

import com.waraqat.Waraqat.dto.AllUsersDTO;
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
    public FollowServiceImp(UserRepo repo, FollowRepo followRepo){
        this.userRepo = repo;
        this.followRepo = followRepo;
    }

    @Override
    public String follow(Long follower_id, Long following_id) {

       User follower = userRepo.findUserById(follower_id);
       if(follower == null){
           throw new UserNotFoundException("follower user dose not exist");
       }

       User following = userRepo.findUserById(following_id);
       if(following_id == null){
           throw new UserNotFoundException(" following user dose not exist");
       }

       if(follower_id.equals(following_id)){
           throw new IllegalArgumentException("User cant follow himself");
       }

        FollowCompositeKey key = new FollowCompositeKey(follower_id,following_id);
       if(followRepo.existsById(key)){
           throw new IllegalArgumentException("You are already following this user");
       }

        System.out.println("the key is: " + key);

        Follow follow = new Follow();
        follow.setPrimaryKey(key);
        follow.setFollower(follower);
        follow.setFollowing(following);

        followRepo.save(follow);
        return "Done! followed";
    }

    @Override
    public String unfollow(Long follower_id, Long following_id) {
        FollowCompositeKey key = new FollowCompositeKey(follower_id,following_id);

        if (!followRepo.existsById(key)) {
            throw new IllegalStateException("Not following this user");
        }

        followRepo.deleteById(key);
        return "Done! unfollowed";
    }



    @Override
    public List<UserFollowDTO> getFollowing(Long id) {
        List<User> allFollowers = followRepo.findAllByFollower_id(id);
        List<UserFollowDTO> allFollowDTOS = new ArrayList<>();

        for(User user: allFollowers){
            UserFollowDTO dto = new UserFollowDTO(user,
                    followRepo.existsByFollowerIdAndFollowingId(id,
                                                            user.getId()));
            allFollowDTOS.add(dto);
        }

        return allFollowDTOS;
    }

    @Override
    public List<UserFollowDTO> getFollowers(Long id) {
        List<User> allFollowing = followRepo.findAllByFollower_id(id);
        List<UserFollowDTO> usersDTOS = new ArrayList<>();

        for(User user : allFollowing){
            UserFollowDTO allUsersDTO = new UserFollowDTO(user, followRepo.existsByFollowerIdAndFollowingId(id,user.getId()));
            usersDTOS.add(allUsersDTO);
        }

        return usersDTOS;
    }
}
