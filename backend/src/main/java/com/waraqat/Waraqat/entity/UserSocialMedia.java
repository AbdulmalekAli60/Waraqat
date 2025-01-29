package com.waraqat.Waraqat.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_social_media")
public class UserSocialMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "name")
    private String name;

    @Column(name = "url")
    private String URL;
}
