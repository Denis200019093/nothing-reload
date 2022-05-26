package com.nukem.nothingreloaded.entity.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nukem.nothingreloaded.entity.User;
import lombok.Data;

import java.util.Set;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto {
    private Long id;
    private String username;
    private Set<User> subscriptions;
    private Set<User> subscribers;

    public UserDto(User user) {
        id = user.getId();
        username = user.getUsername();
    }

    public static UserDto convertUserToDto(User user) {
        UserDto userDto = new UserDto(user);
        userDto.setSubscribers(userDto.getSubscribers());
        userDto.setSubscriptions(userDto.getSubscriptions());
        return userDto;
    }
}
