package com.waraqat.Waraqat.services;

import com.waraqat.Waraqat.dto.CategoryDTO;
import com.waraqat.Waraqat.entity.Categories;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface CategoriesService {

    String addCategory(CategoryDTO categoryDTO);

    String deleteById(Long id);

    List<CategoryDTO> getAllCategories();


    CategoryDTO findCategoryById(Long id);

}
