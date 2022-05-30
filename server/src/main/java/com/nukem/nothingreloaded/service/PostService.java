package com.nukem.nothingreloaded.service;

import com.nukem.nothingreloaded.entity.Post;
import com.nukem.nothingreloaded.exception.exceptions.PostNotFoundException;
import com.nukem.nothingreloaded.repository.PostRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepo postRepo;

    public void savePost(Post post) {
        postRepo.save(post);
    }

    public List<Post> findAll() {
        return postRepo.findAll();
    }

    public Post findById(Long id) {
        return postRepo.findById(id).orElseThrow(() -> new PostNotFoundException(id));
    }

    public List<Post> findByContentContainingIgnoreCase(String query) {
        return postRepo.findByContentContainingIgnoreCase(query);
    }
}
