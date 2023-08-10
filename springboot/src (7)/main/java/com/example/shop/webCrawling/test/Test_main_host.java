package com.example.shop.webCrawling.test;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import com.example.shop.webCrawling.dto.JSONPaser2DTO;
import com.example.shop.webCrawling.dto.JSONPaser2DTO.Host;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Test_main_host {
	
	public static void main(String[] args) throws IOException {
		
		
		
		
		
		String url = "https://shareit.kr/venue/2166";
		
		Document doc =Jsoup.connect(url).get();
		
		Elements d1 = doc.getElementsByAttributeValue("id","__NEXT_DATA__");
		
		
		String str = d1.dataNodes().get(0).getWholeData().replaceAll("__N_SSG", "nssg");
		
		//System.out.println(str);
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		// field 일치하지않는거 무시하겠다는 내용 // 주의 : 원하는 데이턱 안들어갈수있음
			
		
		JSONPaser2DTO JsonDate = objectMapper.readValue(str, JSONPaser2DTO.class);
		
		
		Host host = JsonDate.getProps().getPageProps().getSpace().getHost();
		
		//name
		
		host.getName();
		
		// address
		host.getAddress();		
		
		
		//comment
		host.getDescription();
		
		//위도 
		host.getLatitude();
		
		//경도
		host.getLongitude();
		
			
		//logo
		host.getImage().getResourcePath();
				
		
		
	}
	
}
