package com.nukem.nothingreloaded;

import com.nukem.nothingreloaded.entity.Role;
import com.nukem.nothingreloaded.entity.User;
import com.nukem.nothingreloaded.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
public class NothingReloadedApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(NothingReloadedApplication.class, args);
    }

    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) throws Exception {
        User user = new User("admin", "admin", "admin@admin.admin");
        userService.saveUser(user);
        userService.setRoles(user, Stream.of(Role.ADMIN).collect(Collectors.toSet()));
    }

}
