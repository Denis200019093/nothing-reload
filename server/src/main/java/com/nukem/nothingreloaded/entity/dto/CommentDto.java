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
    private Rate rate;

    public CommentDto(Comment comment) {
        id = comment.getId();
        text = comment.getText();
        author = new UserDto(comment.getAuthor());
        rate = new Rate(comment.getLikesCount(), comment.getDislikesCount());
    }

    public static CommentDto convertCommentToDto(Comment comment, User user) {
        CommentDto commentDto = new CommentDto(comment);
        commentDto.rate.setUserLiked(comment.getLikes().contains(user));
        commentDto.rate.setUserDisliked(comment.getDislikes().contains(user));
        return commentDto;
    }

}
