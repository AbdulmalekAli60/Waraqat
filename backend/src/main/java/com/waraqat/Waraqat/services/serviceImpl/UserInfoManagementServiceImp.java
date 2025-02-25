package com.waraqat.Waraqat.services.serviceImpl;

import com.waraqat.Waraqat.dto.AllUsersDTO;
import com.waraqat.Waraqat.dto.EditProfileDTO;
import com.waraqat.Waraqat.dto.UserResponseDTO;
import com.waraqat.Waraqat.entity.User;
import com.waraqat.Waraqat.exceptions.Unauthorized;
import com.waraqat.Waraqat.exceptions.UserNotFoundException;
import com.waraqat.Waraqat.repository.FollowRepo;
import com.waraqat.Waraqat.repository.UserRepo;
import com.waraqat.Waraqat.services.FollowService;
import com.waraqat.Waraqat.services.UserInfoManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Component
public class UserInfoManagementServiceImp implements UserInfoManagementService {

    private UserRepo userRepo;
    private FollowRepo followRepo;

    @Autowired
    public UserInfoManagementServiceImp(UserRepo repo,FollowRepo service){
        this.userRepo = repo;
        this.followRepo = service;
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

    @Override
    public String deleteUserWithId(Long id) {
        userRepo.deleteById(id);
        return "User with id: " + id + " has been deleted";
    }

    @Override
    public List<AllUsersDTO> getAllUsers() {
        List<User> allUsers = userRepo.findAll();
        List<AllUsersDTO> dtoList = new ArrayList<>();

        for(User user : allUsers ){
           AllUsersDTO usersDTO = new  AllUsersDTO(user, followRepo.existsByFollowingId(user.getId()));
           dtoList.add(usersDTO);
        }
        return dtoList;
    }
}
