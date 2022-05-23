package com.nukem.nothingreloaded.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Getter
@Setter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Please fill the title")
    private String title;
    @Lob
    @NotBlank(message = "Please fill the message")
    private String content;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    @JsonManagedReference
    @OneToMany(
            mappedBy = "post",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    private List<Comment> comments;

    public Post() {
    }

    public Post(String title, String content, User author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public void addComment(Comment comment){
        comments.add(comment);
    }
}
