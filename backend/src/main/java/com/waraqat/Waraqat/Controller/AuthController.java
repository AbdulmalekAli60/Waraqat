package com.waraqat.Waraqat.Controller;

import com.waraqat.Waraqat.DTO.UserDTO;
import com.waraqat.Waraqat.Services.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    @Autowired
    public AuthController(final AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> signup(@RequestBody @Valid UserDTO userDTO){
       UserDTO newUser = authService.signup(userDTO);

       return ResponseEntity.ok(newUser);
    }
}
