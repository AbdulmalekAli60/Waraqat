package com.waraqat.Waraqat.services.serviceImpl;

import com.waraqat.Waraqat.dto.JwtDTO;
import com.waraqat.Waraqat.dto.LoginDTO;
import com.waraqat.Waraqat.dto.UserDTO;
import com.waraqat.Waraqat.dto.UserResponseDTO;
import com.waraqat.Waraqat.entity.User;
import com.waraqat.Waraqat.exceptions.UserNotFoundException;
import com.waraqat.Waraqat.exceptions.UsernameAlreadyexist;
import com.waraqat.Waraqat.repository.UserRepo;
import com.waraqat.Waraqat.services.AuthService;
import com.waraqat.Waraqat.services.JwtService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AuthServiceImpl implements AuthService {

    private final UserRepo userRepo;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    @Autowired
    public AuthServiceImpl(final UserRepo userRepo, final ModelMapper mapper
            ,final AuthenticationManager manager
            ,final BCryptPasswordEncoder encoder
            ,final JwtService service) {
        this.userRepo = userRepo;
        this.modelMapper = mapper;
        this.passwordEncoder = encoder;
        this.authenticationManager = manager;
        this.jwtService = service;
    }

    @Override
    public JwtDTO signup(UserDTO userDTO) {

        if(userRepo.existsByEmail(userDTO.getEmail())){
            throw new UsernameAlreadyexist("Email is already used before");
        }

        if(userRepo.findByusername(userDTO.getUsername()) != null){
            throw new UsernameAlreadyexist("Username is used");
        }

        User newUser = new User(
                userDTO.getName(),
                "@".concat(userDTO.getUsername().trim()),
                userDTO.getEmail().trim(),
                passwordEncoder.encode(userDTO.getPassword()),
//                getRandomProfileImage()
                "https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg"
        );


       User savedNewUser = userRepo.save(newUser);

        UserResponseDTO userInfoForClinet = new UserResponseDTO(savedNewUser);


       String token = jwtService.generateToken(userDTO.getEmail());

        return new JwtDTO(token,userInfoForClinet);
    }

    @Override
    public JwtDTO login(LoginDTO loginDTO) {
        User loginUser = userRepo.findByemail(loginDTO.getEmail());

        Authentication authentication = authenticationManager.authenticate( // return authenticated object
             new UsernamePasswordAuthenticationToken(loginDTO.getEmail(),loginDTO.getPassword())
        );

        if(authentication.isAuthenticated()){
            UserResponseDTO loggedInUserData = new UserResponseDTO(loginUser);
            String token = jwtService.generateToken(loginDTO.getEmail());
            return new JwtDTO(token,loggedInUserData);
        }else {
            throw new UserNotFoundException("User is not found");
        }
    }
}
