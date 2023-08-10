package com.example.shop.payments.dto;

import java.util.List;

import lombok.Data;

@Data
public class PaymentsCancelResponseDTO {
	
	private String paymentKey;
	private String orderId;
	private String orderName;
	private String method;
	private List<CancelsDTO> cancels;
	
}
