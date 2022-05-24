package com.nukem.nothingreloaded.entity.dto;

import com.nukem.nothingreloaded.entity.Comment;
import com.nukem.nothingreloaded.entity.Post;
import com.nukem.nothingreloaded.entity.User;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class PostDto {

    private Long id;
    private String title;
    private String content;
    private UserDto author;
    private List<CommentDto> comments;
    private Long likes;
    private Long dislikes;
    private boolean isUserLiked;
    private boolean isUserDisliked;


    public PostDto(Post post) {
        id = post.getId();
        title = post.getTitle();
        content = post.getContent();
        author = new UserDto(post.getAuthor());
        likes = post.getLikesCount();
        dislikes = post.getDislikesCount();
    }

    public static PostDto convertPostToDto(Post post, User user) {
        PostDto postDto = new PostDto(post);
        postDto.setComments(post.getComments().stream().map((comment -> CommentDto.convertCommentToDto(comment, user))).collect(Collectors.toList()));
        postDto.setUserLiked(post.getLikes().contains(user));
        postDto.setUserDisliked(post.getDislikes().contains(user));
        return postDto;
    }
}
