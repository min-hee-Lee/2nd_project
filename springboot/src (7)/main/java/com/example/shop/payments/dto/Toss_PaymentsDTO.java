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
public class Toss_PaymentsDTO {
	
	private String mid;
	private String version;
	private String paymentKey;
	private String orderId;
	private String orderName;
	private String method;
	
	private EasyPayDTO easyPay;
	
	
	
}


