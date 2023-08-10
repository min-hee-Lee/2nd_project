package com.example.shop.test;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;

import lombok.Data;

@Data
public class KingDTO {
	
	@JsonIgnoreProperties(ignoreUnknown = true)
	private String comMsgHeader;
	
	private MsgHeaderDTO msgHeader;
	
	@JsonIgnoreProperties(ignoreUnknown = true)
	
	private TestTestTestDTO msgBody;
}
