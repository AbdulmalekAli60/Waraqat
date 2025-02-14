package com.waraqat.Waraqat.services;

import com.waraqat.Waraqat.dto.AllUsersDTO;
import com.waraqat.Waraqat.dto.EditProfileDTO;
import com.waraqat.Waraqat.dto.UserResponseDTO;
import com.waraqat.Waraqat.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserInfoManagementService {

    UserResponseDTO getUserWithId(Long id);

    UserResponseDTO editeProfile(Long id, EditProfileDTO editProfileDTO);

    String deleteUserWithId(Long id);

    List<AllUsersDTO> getAllUsers();
}
