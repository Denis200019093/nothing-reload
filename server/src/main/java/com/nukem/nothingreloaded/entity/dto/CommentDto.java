package com.nukem.nothingreloaded.entity.dto;


import com.nukem.nothingreloaded.entity.Comment;
import com.nukem.nothingreloaded.entity.User;
import lombok.Data;

@Data
public class CommentDto {
    private Long id;
    private String title;
    private String text;
    private UserDto author;
    private Long likes;
    private Long dislikes;
    private boolean isUserLiked;
    private boolean isUserDisliked;

    public CommentDto(Comment comment) {
        id = comment.getId();
        text = comment.getText();
        author = new UserDto(comment.getAuthor());
        likes = comment.getLikesCount();
        dislikes = comment.getDislikesCount();
    }

    public static CommentDto convertCommentToDto(Comment comment, User user) {
        CommentDto commentDto = new CommentDto(comment);
        commentDto.setUserLiked(comment.getLikes().contains(user));
        commentDto.setUserDisliked(comment.getDislikes().contains(user));
        return commentDto;
    }

}
