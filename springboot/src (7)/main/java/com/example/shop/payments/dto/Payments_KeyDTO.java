package com.example.shop.payments.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Payments_KeyDTO {
	
	private Integer booking_code;
	
	private String payments_key;
	
	private int t_id;
	
}
