package com.waraqat.Waraqat.services.serviceImpl;

import com.waraqat.Waraqat.dto.EditProfileDTO;
import com.waraqat.Waraqat.dto.UserResponseDTO;
import com.waraqat.Waraqat.entity.User;
import com.waraqat.Waraqat.exceptions.Unauthorized;
import com.waraqat.Waraqat.exceptions.UserNotFoundException;
import com.waraqat.Waraqat.repository.UserRepo;
import com.waraqat.Waraqat.services.UserInfoManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Component
public class UserInfoManagementServiceImp implements UserInfoManagementService {

    private UserRepo userRepo;

    @Autowired
    public UserInfoManagementServiceImp(UserRepo repo){
        this.userRepo = repo;
    }

    @Override
    public UserResponseDTO getUserWithId(Long id) {

        User retrievedUserWithId = userRepo.findUserById(id);

        if(retrievedUserWithId == null){
            throw new UserNotFoundException("User with id: " + id + " was not found");
        }
        return new UserResponseDTO(retrievedUserWithId);
    }

    @Override
    public UserResponseDTO editeProfile(Long id, EditProfileDTO editProfileDTO) {

        User user = userRepo.findUserById(id);

        if(user == null){
            throw new UserNotFoundException("user was not found");
        }

        if(user.getId() != editProfileDTO.getId()){ // if the user trying to edit the profile is not the same user error
            throw new Unauthorized("you are unauthorized to modify this resource");
        }

        if (editProfileDTO.getName() != null) {
            user.setName(editProfileDTO.getName());
        }
        if (editProfileDTO.getBio() != null) {
            user.setBio(editProfileDTO.getBio());
        }
        if (editProfileDTO.getProfileImage() != null) {
            user.setProfileImage(editProfileDTO.getProfileImage());
        }

        userRepo.save(user);

        return new UserResponseDTO(user);
    }
}
