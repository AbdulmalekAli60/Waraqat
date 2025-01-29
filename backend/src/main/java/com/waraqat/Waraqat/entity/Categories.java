package com.waraqat.Waraqat.entity;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "categories")
public class Categories {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Articles article;

    @Column(name = "name")
    private String categoryName;

    @Column(name = "description")
    private String categoryDescription;

    @OneToMany(mappedBy = "category")
    private Set<Articles> articles = new HashSet<>();
}
