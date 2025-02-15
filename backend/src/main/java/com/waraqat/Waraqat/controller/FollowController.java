package com.waraqat.Waraqat.controller;

import com.waraqat.Waraqat.dto.AllFollowDTO;
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
    public FollowController(FollowService followService){
        this.service = followService;
    }

    @PostMapping("/follow/{followingId}")
    public ResponseEntity<String> follow(
              @AuthenticationPrincipal CustomUserDetails userDetails
            , @PathVariable("followingId") Long followingId){
        Long currentUserId = userDetails.getId();
        String result = service.follow(currentUserId,followingId);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/unfollow/{followingId}")
    public ResponseEntity<String> unfollow(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("followingId") Long followingId
    ){
       Long currentUserId = userDetails.getId();
       String result = service.unfollow(currentUserId,followingId);
       return ResponseEntity.ok(result);
    }

    @GetMapping("/getAllFollowers")
    public ResponseEntity<List<AllFollowDTO>> getAllFollowersById(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ){
        Long currentUserId = userDetails.getId();
        List<AllFollowDTO> allFollowDTOS = service.getFollowers(currentUserId);
        return ResponseEntity.ok(allFollowDTOS);
    }
}
