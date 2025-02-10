package com.waraqat.Waraqat.services;

import com.waraqat.Waraqat.dto.JwtDTO;
import com.waraqat.Waraqat.dto.LoginDTO;
import com.waraqat.Waraqat.dto.UserDTO;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    JwtDTO signup(UserDTO userDTO);

    JwtDTO login(LoginDTO loginDTO);
}
