package com.example.shop.wishList.dto;

import lombok.Data;

@Data
public class Month_SalesDTO {
	
	private Integer total_sales;
	private String month;
	private double sales_diff_percent;
	private Integer sales_diff;
	
}
