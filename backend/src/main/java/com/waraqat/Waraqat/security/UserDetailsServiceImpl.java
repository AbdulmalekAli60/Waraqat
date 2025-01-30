package com.waraqat.Waraqat.security;

import com.waraqat.Waraqat.entity.User;
import com.waraqat.Waraqat.exceptions.UserNotFoundException;
import com.waraqat.Waraqat.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepo userRepo;


    @Autowired
    public UserDetailsServiceImpl(final UserRepo repo){
        this.userRepo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UserNotFoundException {

      User user = userRepo.findByusername(username);

      if(user == null) {
          throw new UserNotFoundException("User was not found");
      }
        return new CustomUserDetails(user);
    }
}
