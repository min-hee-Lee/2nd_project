package com.example.shop.test;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
public class MsgHeaderDTO {
	
	private Integer headerCd;
	
	private String headerMsg;
	
	private Integer itemCount;
}
