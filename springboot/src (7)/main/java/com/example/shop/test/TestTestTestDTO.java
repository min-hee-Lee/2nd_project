package com.example.shop.test;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;

import lombok.Data;

@Data
public class TestTestTestDTO {
	

	@JsonIgnoreProperties(ignoreUnknown = true)
	@JsonSetter(nulls = Nulls.SKIP)
	private List<BusObDTO> itemList;
		
}
