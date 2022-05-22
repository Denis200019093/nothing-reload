package com.nukem.nothingreloaded.service;

import com.nukem.nothingreloaded.entity.Comment;
import com.nukem.nothingreloaded.repository.CommentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepo commentRepo;


    public void saveComment(Comment comment) {
        commentRepo.save(comment);
    }
}
