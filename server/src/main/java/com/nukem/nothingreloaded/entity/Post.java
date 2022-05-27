package com.nukem.nothingreloaded.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.*;

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
    @CreatedDate
    private Date createdDate = new Date();

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
    private List<Comment> comments = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "post_likes",
            joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<User> likes = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "post_dislikes",
            joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<User> dislikes = new HashSet<>();

    public Post() {
    }

    public Post(String title, String content, User author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public void addLike(User user) {
        if (!likes.contains(user)) likes.add(user);
        else likes.remove(user);
        dislikes.remove(user);
    }

    public void addDislike(User user) {
        if (!dislikes.contains(user)) dislikes.add(user);
        else dislikes.remove(user);
        likes.remove(user);
    }

    public int getDislikesCount() {
        return dislikes.size();
    }

    public int getLikesCount() {
        return likes.size();
    }
}
