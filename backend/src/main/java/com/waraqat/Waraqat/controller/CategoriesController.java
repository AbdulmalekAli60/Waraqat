package com.waraqat.Waraqat.controller;

import com.waraqat.Waraqat.dto.CategoryDTO;
import com.waraqat.Waraqat.entity.Categories;
import com.waraqat.Waraqat.services.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categories")
@CrossOrigin("*")
public class CategoriesController {

    private final CategoriesService categoriesService;

    @Autowired
    public CategoriesController(CategoriesService service){
        this.categoriesService = service;
    }

    @PostMapping("/addCategory")
    public ResponseEntity<String> addNewCategory(@RequestBody CategoryDTO categoryDTO){
       String message = categoriesService.addCategory(categoryDTO);
       return ResponseEntity.ok(message);
    }

    @DeleteMapping("/deleteCategory/{id}")
    public ResponseEntity<String> deleteCategoryById(@PathVariable Long id){
        String message = categoriesService.deleteById(id);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/getAllCategories")
    public ResponseEntity<List<CategoryDTO>> getAllCategories(){
        List<CategoryDTO> categoryDTOList = categoriesService.getAllCategories();
        return ResponseEntity.ok(categoryDTOList);
    }

    @GetMapping("/findCategoryById/{id}")
    public ResponseEntity<CategoryDTO> findCategoryById(@PathVariable Long id){
        CategoryDTO category = categoriesService.findCategoryById(id);
        return ResponseEntity.ok(category);
    }
}
