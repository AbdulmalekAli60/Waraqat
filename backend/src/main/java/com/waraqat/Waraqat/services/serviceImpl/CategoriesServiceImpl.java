package com.waraqat.Waraqat.services.serviceImpl;

import com.waraqat.Waraqat.dto.CategoryDTO;
import com.waraqat.Waraqat.entity.Categories;
import com.waraqat.Waraqat.repository.CategoriesRepo;
import com.waraqat.Waraqat.services.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class CategoriesServiceImpl implements CategoriesService {

    private final CategoriesRepo categoriesRepo;

    @Autowired
    public CategoriesServiceImpl(CategoriesRepo repo){
        this.categoriesRepo = repo;
    }

    @Override
    public String addCategory(CategoryDTO categoryDTO) {

        Categories categories = new Categories(
                categoryDTO.getName(),
                categoryDTO.getDescription()
        );

        categoriesRepo.save(categories);

        return "Category with id: " + categories.getId() + " has been added";
    }

    @Override
    public String deleteById(Long id) {
       Optional<Categories> category = categoriesRepo.findById(id);
        if(category.isPresent()){
            categoriesRepo.deleteById(id);
            return "Category with id: " + id + " has been deleted";
        }
        throw new IllegalArgumentException("there is no category with the given id.");
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
       List<Categories> categoriesList = categoriesRepo.findAll();
       List<CategoryDTO> categoryDTOList = new ArrayList<>();
        System.out.println("The list is: " + categoriesList.toString());
       for(Categories category : categoriesList){
           CategoryDTO categoryDTO = new CategoryDTO(category);
           categoryDTOList.add(categoryDTO);
       }

        return categoryDTOList;
    }

    @Override
    public CategoryDTO findCategoryById(Long id) {
        // All categories (id = 0)
        if (id == 0) {
            // Create a dummy "All" category DTO
            CategoryDTO allCategory = new CategoryDTO();
            allCategory.setId(0L);
            allCategory.setName("All Categories");
            return allCategory;
        }

        boolean isCategory = categoriesRepo.existsById(id);
        if (isCategory) {
            Categories category = categoriesRepo.findCategoryById(id);
            return new CategoryDTO(category);
        }

        throw new IllegalArgumentException("There is no category with the given Id");
    }
}
