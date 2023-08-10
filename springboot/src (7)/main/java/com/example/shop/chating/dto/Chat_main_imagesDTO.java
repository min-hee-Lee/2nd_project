package com.example.shop.chating.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Chat_main_imagesDTO {
	
	private int review_code;
	private int main_code;
	private String filename;
	private String filepath;
	private String reg_date;
	private String type;
	
	private int rm;
	
	private String main_address;
	private String title;
	private String cost;
	private String time_about;
	
	private double avg_rating;
	private int count_rating;
	private int wish_count;
	
	
	private double distance;
	
	
	private String longitude;
	private String latitude;
	
	
}

