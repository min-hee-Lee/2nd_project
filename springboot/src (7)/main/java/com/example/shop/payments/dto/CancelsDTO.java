package com.example.shop.payments.dto;

import lombok.Data;

@Data
public class CancelsDTO {

	private String cancelReason;
	private String canceledAt;
	private Integer cancelAmount;
	private Integer taxFreeAmount;
	private Integer taxExemptionAmount;
	private Integer refundableAmount;
	private Integer easyPayDiscountAmount;
	private String transactionKey;
	private String receiptKey;
}
