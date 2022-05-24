package com.nukem.nothingreloaded.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank
    private String text;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author_id", nullable = true, updatable = false)
    private User author;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

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

    public long getDislikesCount() {
        return dislikes.size();
    }

    public long getLikesCount() {
        return likes.size();
    }

}
