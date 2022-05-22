package com.nukem.nothingreloaded.controller;

import com.nukem.nothingreloaded.entity.Comment;
import com.nukem.nothingreloaded.entity.Post;
import com.nukem.nothingreloaded.entity.User;
import com.nukem.nothingreloaded.service.CommentService;
import com.nukem.nothingreloaded.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(("/posts"))
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts(){
        List<Post> postList = postService.findAll();
        return new ResponseEntity<>(postList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.findById(id));
    }

    @PostMapping
    public ResponseEntity<?> addPost(@AuthenticationPrincipal User user,
                                              @Valid @RequestBody Post post) {

        post.setAuthor(user);
        postService.savePost(post);

        return new ResponseEntity<>(post, HttpStatus.CREATED);
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<Comment> addComment(@AuthenticationPrincipal User user, @Valid @RequestBody Comment comment,
                                                 @PathVariable Long id){

        Post post = postService.findById(id);
        comment.setPost(post);
        comment.setAuthor(user);
        commentService.saveComment(comment);

        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}/comment")
    public ResponseEntity<HttpStatus> deleteComment(@PathVariable Long id){
        commentService.deleteCommentById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
