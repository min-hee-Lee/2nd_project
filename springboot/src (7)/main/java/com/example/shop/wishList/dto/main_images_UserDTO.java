package com.example.shop.wishList.dto;

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
public class main_images_UserDTO {
	
	private int wish_code;
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
	
	private double distance;
	
	
	private String longitude;
	private String latitude;
	
	
}

