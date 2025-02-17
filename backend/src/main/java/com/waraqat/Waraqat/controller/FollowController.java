package com.waraqat.Waraqat.controller;

import com.waraqat.Waraqat.dto.AllUsersDTO;
import com.waraqat.Waraqat.dto.UserFollowDTO;
import com.waraqat.Waraqat.security.CustomUserDetails;
import com.waraqat.Waraqat.services.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/followManagement")
public class FollowController {
    private final FollowService service;

    @Autowired
    public FollowController(FollowService followService) {
        this.service = followService;
    }

    @PostMapping("/follow/{followingId}")
    public ResponseEntity<String> follow(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("followingId") Long followingId) {
        Long currentUserId = userDetails.getId();
        String result = service.follow(currentUserId, followingId);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/unfollow/{followingId}")
    public ResponseEntity<String> unfollow(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("followingId") Long followingId) {
        Long currentUserId = userDetails.getId();
        String result = service.unfollow(currentUserId, followingId);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/getFollowing/{id}")
    public ResponseEntity<List<UserFollowDTO>> getAllFollowing(
            @PathVariable("id") Long id) {
        List<UserFollowDTO> following = service.getFollowing(id);
        return ResponseEntity.ok(following);
    }

    @GetMapping("/getFollowers/{id}")
    public ResponseEntity<List<UserFollowDTO>> getAllFollowers(
            @PathVariable("id") Long id) {
        List<UserFollowDTO> followers = service.getFollowers(id);
        return ResponseEntity.ok(followers);
    }
}
