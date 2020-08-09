package com.example.codeengine.expense.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Data
@Table(name ="category")
public class Category {
	
	@Id
	@Column(name="category_id")
	private long categoryId;
	
	@Column(name="category_name")
	private String categoryName;
	

}
