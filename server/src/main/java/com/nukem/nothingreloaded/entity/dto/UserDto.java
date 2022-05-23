package com.nukem.nothingreloaded.entity.dto;

import com.nukem.nothingreloaded.entity.User;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;

    public UserDto(User user) {
        id = user.getId();
        username = user.getUsername();
    }
}
