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
    private boolean isUserLiked;
    private boolean isUserDisliked;


    public PostDto(Post post) {
        id = post.getId();
        title = post.getTitle();
        content = post.getContent();
        author = new UserDto(post.getAuthor());
        comments = post.getComments();
        likes = post.getLikesCount();
        dislikes = post.getDislikesCount();
    }

    public static PostDto convertPostToDto(Post post, User user) {
        PostDto postDto = new PostDto(post);
//        setId(post.getId());
//        setTitle(post.getTitle());
//        setContent(post.getContent());
//        setAuthor(new UserDto(post.getAuthor()));
//        setComments(post.getComments());
//        setLikes(post.getLikesCount());
//        setDislikes(post.getDislikesCount());
        postDto.setUserLiked(post.getLikes().contains(user));
        postDto.setUserDisliked(post.getDislikes().contains(user));
        return postDto;
    }
}
