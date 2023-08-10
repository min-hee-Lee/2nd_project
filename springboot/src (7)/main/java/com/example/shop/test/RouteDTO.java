package com.example.shop.test;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RouteDTO {
	
	
	private String busRouteAbrv;
	
	private Integer busRouteId;
	
	private String busRouteNm;
	
	private Integer busRouteType;
	
	private String firstBusTm;
	
	private String firstBusTmLow;
	
	private String lastBusTm;
	
	private String lastBusTmLow;
	
	private double length;
	
	private Integer nextBus;
	
	private String stBegin;
	
	private String stEnd;
	
	private Integer term;
	
	//private Map<String, RouteDTO> itemList;
	
	
}
