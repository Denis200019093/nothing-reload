package com.nukem.nothingreloaded.entity.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Rate {
    private int rating;
    private boolean isUserLiked;
    private boolean isUserDisliked;

    public Rate(int likes, int dislikes){
        rating = likes-dislikes;
    }
}
