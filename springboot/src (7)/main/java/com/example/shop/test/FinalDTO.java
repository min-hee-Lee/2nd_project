package com.example.shop.test;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)

public class FinalDTO {

	private Integer arsId; // 정류소 고유 ID 5글자
	private Integer dist; // 거리
	private String stationNm; //정류소명
	
	private Integer term; //배차
	
	private String firstBusTm; // 첫차
	private String lastBusTm;  // 막차
	private Integer busRouteId; // 노선 ID
	private String busRouteNm; // 노선명
	private String stBegin; //기점
	private String stEnd;   // 종점
	
	private Map<String, RouteDTO> map;
	private LinkedHashMap<String, RouteDTO> linkHashmap;
	
}
