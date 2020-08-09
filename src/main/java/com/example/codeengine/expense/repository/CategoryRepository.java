package com.example.codeengine.expense.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.codeengine.expense.model.Category;

public interface CategoryRepository extends JpaRepository<Category,Long>{
//Long i steh datat type of ID
	
	Category findByCategoryName(String categoryName);
}
