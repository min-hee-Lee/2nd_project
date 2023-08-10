package com.example.shop.test;

import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;

import lombok.Data;

@Data
public class BusRouteDTO {
	
	@JsonIgnoreProperties(ignoreUnknown = true)
	private String comMsgHeader;
	
	@JsonIgnoreProperties(ignoreUnknown = true)
	private MsgHeaderDTO msgHeader;
	
	@JsonIgnoreProperties(ignoreUnknown = true)
	
	private RouteListDTO msgBody;
	
	
	
}
