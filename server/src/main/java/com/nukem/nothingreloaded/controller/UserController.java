package com.nukem.nothingreloaded.controller;

import com.nukem.nothingreloaded.entity.User;
import com.nukem.nothingreloaded.entity.dto.UserDto;
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

    @GetMapping("/subscribe/{user}")
    public ResponseEntity<?> subscribe(
            @AuthenticationPrincipal User currentUser,
            @PathVariable User user
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
    public ResponseEntity<UserDto> userInfo(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(UserDto.convertUserToDto(user));
    }
}
