package com.example.shop.wishList.dto;

import java.util.List;

import lombok.Data;

@Data
public class Admin_Sales_pageDTO {

	private int rm;
	private int main_code;
	private Integer yearly_sales;
	private int sales_rank;
	
	private String year;
	
	
	
	
	
	private String filename;
	private String filepath;
	
	List<Month_SalesDTO> month_SalesDTO;
	
	
	
}
