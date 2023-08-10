package com.example.shop.payments.dto;

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
public class EasyPayDTO{
	 
	 private String provider;
	 private String amount;
	 private String discountAmount;
	 
 }