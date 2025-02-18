package com.waraqat.Waraqat.dto;

import com.waraqat.Waraqat.entity.Categories;

import java.util.Optional;

public class CategoryDTO {

    private Long id;
    private String name;
    private String description;

    public CategoryDTO() {
    }

    public CategoryDTO(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public CategoryDTO(Categories categories) {
        this.id = categories.getId();
        this.name = categories.getCategoryName();
        this.description = categories.getCategoryDescription();
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "CategoryDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}




