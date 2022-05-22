package com.nukem.nothingreloaded.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
@Setter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Please fill the title")
    private String title;
    @NotBlank(message = "Please fill the message")
    private String content;

//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "author_id")
//    private User author;


}
