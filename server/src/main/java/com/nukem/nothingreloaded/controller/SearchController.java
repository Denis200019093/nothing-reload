package com.nukem.nothingreloaded.controller;

import com.nukem.nothingreloaded.entity.Post;
import com.nukem.nothingreloaded.entity.User;
import com.nukem.nothingreloaded.entity.dto.PostDto;
import com.nukem.nothingreloaded.repository.PostRepo;
import com.nukem.nothingreloaded.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class SearchController {

    private final PostRepo postRepo;
    private final UserRepo userRepo;

    @GetMapping("/results")
    public ResponseEntity<List<PostDto>> findPostsByContent(@RequestParam String query){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepo.findByUsername(auth.getName()).orElse(null);
        List<PostDto> postDtoList = postRepo.findByContentContainingIgnoreCase(query).stream().map((post) -> PostDto.convertPostToDto(post, user)).collect(Collectors.toList());
        return new ResponseEntity<>(postDtoList, HttpStatus.OK);
    }
}
