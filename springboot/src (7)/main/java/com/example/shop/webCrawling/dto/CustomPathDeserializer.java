package com.example.shop.webCrawling.dto;

import java.io.IOException;

import org.springframework.boot.json.JsonParser;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

//public class CustomPathDeserializer extends JsonDeserializer<Path> {
   

//	@Override
//	public Path deserialize(com.fasterxml.jackson.core.JsonParser p, DeserializationContext ctxt)
//			throws IOException, JacksonException {
//		 String value = jsonParser.getValueAsString();
//	        // Enum 값을 변환하는 로직 작성
//	        // 예: value가 "host/thumb/2021-07-06"일 경우, Enum 값으로 변환하여 반환
//	        if ("host/thumb/2021-07-06".equals(value)) {
//	            return Path.HOST_THUMB_20210706;
//	        }
//	        // 그 외의 경우에는 예외 처리 등을 수행
//	        else {
//	            throw new IllegalArgumentException("Invalid value for Path enum: " + value);
//	        }
//		return null;
//	}
//}