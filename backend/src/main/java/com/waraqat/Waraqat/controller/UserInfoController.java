package com.waraqat.Waraqat.controller;

import com.waraqat.Waraqat.dto.AllUsersDTO;
import com.waraqat.Waraqat.dto.EditProfileDTO;
import com.waraqat.Waraqat.dto.UserResponseDTO;
import com.waraqat.Waraqat.services.UserInfoManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/users")
public class UserInfoController {

    @Autowired
    private UserInfoManagementService userInfoManagementService;

    @Autowired
    public UserInfoController(UserInfoManagementService service){
        this.userInfoManagementService = service;
    }

    @GetMapping("/specificUser/{id}")
    public ResponseEntity<UserResponseDTO> getUserWithId(@PathVariable("id") Long userId){
      UserResponseDTO user = userInfoManagementService.getUserWithId(userId);
        return ResponseEntity.ok(user);
    }

    @PatchMapping("/updateInfo")
    public ResponseEntity<UserResponseDTO> updateUserInfo(@RequestBody EditProfileDTO responseDTO){
        UserResponseDTO profileDTO = userInfoManagementService.editeProfile(responseDTO.getId(),responseDTO);
        return ResponseEntity.ok(profileDTO);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<String> deleteUserWithId(@PathVariable Long id){
        String deletedUser =userInfoManagementService.deleteUserWithId(id);
        return ResponseEntity.ok(deletedUser);
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<AllUsersDTO>> getAllUsers(){
       List<AllUsersDTO> allUsers = userInfoManagementService.getAllUsers();
       return ResponseEntity.ok(allUsers);
    }
}
