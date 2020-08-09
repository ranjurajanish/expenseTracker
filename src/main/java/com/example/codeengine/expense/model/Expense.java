package com.example.codeengine.expense.model;

import java.time.Instant;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name="expense")
public class Expense {
	
	@Id
	private long expenseId;
	
	private Instant expenseDate;
	
	private String expenseDescript;
	
	private String location;
	
	@ManyToOne
	private Category category; 
	
	@JsonIgnore
	@ManyToOne
	private User user;
	
	
	

}
