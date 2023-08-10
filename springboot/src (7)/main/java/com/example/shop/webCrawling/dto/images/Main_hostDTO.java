package com.example.shop.webCrawling.dto.images;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;



@ToString
@Getter
@Setter
public class Main_hostDTO {
	private int main_code; 
	private String main_name;
	private String main_address;
	private String main_comment;
	private double latitude;
	private double longitude;
	private String main_logo;
	
	public Main_hostDTO() {
	}

	public Main_hostDTO(int main_code, String main_name, String main_address, String main_comment, double latitude,
			double longitude, String main_logo) {
		this.main_code = main_code;
		this.main_name = main_name;
		this.main_address = main_address;
		this.main_comment = main_comment;
		this.latitude = latitude;
		this.longitude = longitude;
		this.main_logo = main_logo;
	}
		
	
	
}
