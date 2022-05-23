package com.nukem.nothingreloaded.entity.dto;

import com.nukem.nothingreloaded.entity.Comment;
import com.nukem.nothingreloaded.entity.Post;
import com.nukem.nothingreloaded.entity.User;
import lombok.Data;

import java.util.List;

@Data
public class PostDto {

    private Long id;
    private String title;
    private String content;
    private UserDto author;
    private List<Comment> comments;
    private Long likes;
    private Long dislikes;

    public PostDto(Post post) {
        id = post.getId();
        title = post.getTitle();
        content = post.getContent();
        author = new UserDto(post.getAuthor());
        comments = post.getComments();
        likes = post.getLikesCount();
        dislikes = post.getDislikesCount();
    }
}
