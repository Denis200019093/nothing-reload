package com.nukem.nothingreloaded.entity.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nukem.nothingreloaded.entity.User;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class UserDto {
    private Long id;
    private String username;
    private Set<Long> subscriptions;
    private Set<Long> subscribers;
    private boolean isCurrentUserSubscribed;

    public UserDto(User user) {
        id = user.getId();
        username = user.getUsername();
    }

    public static UserDto convertUserToDto(User user) {
        UserDto userDto = new UserDto(user);
        userDto.setSubscribers(user.getSubscribers().stream().map(User::getId).collect(Collectors.toSet()));
        userDto.setSubscriptions(user.getSubscriptions().stream().map(User::getId).collect(Collectors.toSet()));
        return userDto;
    }

    public void setCurrentUserSubscribed(User currentUser) {
        if(subscribers.contains(currentUser.getId())) isCurrentUserSubscribed = true;
    }
}
