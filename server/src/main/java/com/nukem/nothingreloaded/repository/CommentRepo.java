package com.nukem.nothingreloaded.repository;

import com.nukem.nothingreloaded.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo extends JpaRepository<Comment, Long> {
}
