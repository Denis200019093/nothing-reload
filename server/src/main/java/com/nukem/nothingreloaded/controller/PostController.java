package com.nukem.nothingreloaded.controller;

import com.nukem.nothingreloaded.entity.Comment;
import com.nukem.nothingreloaded.entity.Post;
import com.nukem.nothingreloaded.entity.User;
import com.nukem.nothingreloaded.entity.dto.CommentDto;
import com.nukem.nothingreloaded.entity.dto.PostDto;
import com.nukem.nothingreloaded.entity.dto.UserDto;
import com.nukem.nothingreloaded.repository.UserRepo;
import com.nukem.nothingreloaded.service.CommentService;
import com.nukem.nothingreloaded.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(("/posts"))
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final UserRepo userRepo;
    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepo.findByUsername(auth.getName()).orElse(null);
        List<PostDto> postList = postService.findAll().stream().map((post) -> PostDto.convertPostToDto(post, user)).collect(Collectors.toList());
        return new ResponseEntity<>(postList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPostById(@AuthenticationPrincipal User user,
                                               @PathVariable Long id) {
        PostDto postDto = PostDto.convertPostToDto(postService.findById(id), user);
        return ResponseEntity.ok(postDto);
    }

    @PostMapping
    public ResponseEntity<?> addPost(@AuthenticationPrincipal User user,
                                     @Valid @RequestBody Post post) {
        post.setAuthor(user);
        postService.savePost(post);

        return new ResponseEntity<>(new PostDto(post), HttpStatus.CREATED);
    }

    @PostMapping("/{post}/like")
    public ResponseEntity<?> likePost(@AuthenticationPrincipal User user,
                                      @PathVariable(required = false) Post post) {
        if (user == null) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        if (post == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        post.addLike(user);
        postService.savePost(post);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PostMapping("/{post}/dislike")
    public ResponseEntity<?> dislikePost(@AuthenticationPrincipal User user,
                                         @PathVariable(required = false) Post post) {
        if (user == null) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        if (post == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        post.addDislike(user);
        postService.savePost(post);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PostMapping("/{post}/comment")
    public ResponseEntity<CommentDto> addComment(@AuthenticationPrincipal User user,
                                              @Valid @RequestBody Comment comment,
                                              @PathVariable(required = false) Post post) {
        if (user == null) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        if (post == null) return new ResponseEntity<>(new CommentDto(comment), HttpStatus.BAD_REQUEST);
        comment.setPost(post);
        comment.setAuthor(user);
        commentService.saveComment(comment);

        return new ResponseEntity<>(new CommentDto(comment), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}/comment")
    public ResponseEntity<HttpStatus> deleteComment(@PathVariable Long id) {
        commentService.deleteCommentById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
