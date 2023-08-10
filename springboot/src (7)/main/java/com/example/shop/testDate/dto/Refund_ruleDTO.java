package com.example.shop.testDate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Refund_ruleDTO {
		
	private int main_code;
	private String refund_info;
	private String refund_info_detail;
}
