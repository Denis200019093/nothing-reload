package com.nukem.nothingreloaded.repository;

import com.nukem.nothingreloaded.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepo extends JpaRepository<Post, Long> {

}
