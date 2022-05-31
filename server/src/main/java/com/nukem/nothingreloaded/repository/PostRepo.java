package com.nukem.nothingreloaded.repository;

import com.nukem.nothingreloaded.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepo extends JpaRepository<Post, Long> {

    @Query("select p from Post p where upper(p.content) like upper(concat('%', ?1, '%'))")
    List<Post> findByContentContainingIgnoreCase(String content);

    Page<Post> findAll(Pageable pageable);

}
