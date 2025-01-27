package com.waraqat.Waraqat.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "article_images")
public class ArticleImages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Articles article;

    @Column(name = "image_url")
    private String imageURL;

}
