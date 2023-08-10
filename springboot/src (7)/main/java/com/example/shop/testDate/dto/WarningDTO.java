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
public class WarningDTO {
	
	private int main_code;
	private String warn_info;
	private String warn_info_detail;
	
	
	
}
