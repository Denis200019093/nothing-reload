package com.nukem.nothingreloaded.controller;

import com.nukem.nothingreloaded.entity.User;
import com.nukem.nothingreloaded.entity.dto.UserDto;
import com.nukem.nothingreloaded.repository.UserRepo;
import com.nukem.nothingreloaded.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepo userRepo;

    @GetMapping("/subscribe/{user}")
    public ResponseEntity<?> subscribe(
            @AuthenticationPrincipal User currentUser,
            @PathVariable(required = false) User user
    ) {
        userService.subscribe(currentUser, user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/unsubscribe/{user}")
    public ResponseEntity<?> unsubscribe(
            @AuthenticationPrincipal User currentUser,
            @PathVariable User user
    ) {
        userService.unsubscribe(currentUser, user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/userinfo")
    public ResponseEntity<UserDto> userInfo(@AuthenticationPrincipal User u) {
        User user = userRepo.findByUsername(u.getUsername()).orElse(null);
        return ResponseEntity.ok(UserDto.convertUserToDto(user));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDto> getUser(@AuthenticationPrincipal User user, @PathVariable Long id) {
        UserDto userDto = UserDto.convertUserToDto(userRepo.getById(id));
        userDto.setCurrentUserSubscribed(user);
        return ResponseEntity.ok(userDto);
    }
}
