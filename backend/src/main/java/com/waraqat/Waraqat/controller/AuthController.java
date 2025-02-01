package com.waraqat.Waraqat.controller;

import com.waraqat.Waraqat.dto.JwtDTO;
import com.waraqat.Waraqat.dto.LoginDTO;
import com.waraqat.Waraqat.dto.UserDTO;
import com.waraqat.Waraqat.services.AuthService;
import com.waraqat.Waraqat.services.JwtService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;
    @Autowired
    public AuthController(final AuthService authService,final JwtService service) {
        this.authService = authService;
        this.jwtService = service;
    }

    @PostMapping("/signup")
    public ResponseEntity<JwtDTO> signup(@RequestBody @Valid UserDTO userDTO){
       JwtDTO newUser = authService.signup(userDTO);

       return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtDTO> login(@RequestBody @Valid LoginDTO loginDTO){
        JwtDTO loggedInUser = authService.login(loginDTO);
        return ResponseEntity.ok(loggedInUser);
    }
}
