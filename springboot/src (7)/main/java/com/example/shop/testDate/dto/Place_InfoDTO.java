package com.example.shop.testDate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Place_InfoDTO{

	private int main_code;
	private String area;
	private String width;
	private String height;
	private String length;
	private String max;
	
}
