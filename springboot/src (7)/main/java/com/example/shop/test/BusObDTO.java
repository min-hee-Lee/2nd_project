package com.example.shop.test;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class BusObDTO {
	
	private Integer arsId;
	
	private Integer dist;
	private double gpsX;
	private double gpsY;
	private double posX;
	private double posY;
	private Integer stationId;
	
	private String stationNm;
	private Integer stationTp;
	
}
//arsId=22232, dist=33, gpsX=126.9961463518, gpsY=37.4834494617
//, posX=199659.20800330775, posY=442673.37980246684, 
//stationId=121000156, stationNm=방배1동주민센터.방배아크로타워, stationTp