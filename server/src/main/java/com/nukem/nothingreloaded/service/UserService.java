package com.nukem.nothingreloaded.service;

import com.nukem.nothingreloaded.entity.Role;
import com.nukem.nothingreloaded.entity.User;
import com.nukem.nothingreloaded.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepo userRepo;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public void saveUser(User user) {
        userRepo.findByUsername(user.getUsername()).orElseThrow(() -> new RuntimeException("User already exists!"));

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(Collections.singleton(Role.ADMIN));

        userRepo.save(user);
    }

    public void setRoles(User user, Set<Role> roles) {
        user.setRoles(roles);
        userRepo.save(user);
    }

}
