package com.example.shop.webCrawling.test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import com.example.shop.webCrawling.dto.JSONPaser2DTO;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Test_2 {

	public static void main(String[] args) throws IOException {
		
		
		String url = "https://shareit.kr/venue/2166";
		
		Document doc =Jsoup.connect(url).get();
		
		Elements d1 = doc.getElementsByAttributeValue("id","__NEXT_DATA__");
		
		
		String str = d1.dataNodes().get(0).getWholeData().replaceAll("__N_SSG", "nssg");
		
		//System.out.println(str);
		
		ObjectMapper objectMapper = new ObjectMapper();
	
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		// field 일치하지않는거 무시하겠다는 내용 // 주의 : 원하는 데이턱 안들어갈수있음
			
		
		JSONPaser2DTO JsonDate 
		= objectMapper.readValue(str, JSONPaser2DTO.class);
		
		//System.out.println(JsonDate);
		
		
		//filepath
		//String filepath =JsonDate.getProps().getPageProps().getSpace().getPhotos().get(0).getFile().getResourcePath();
		
		//System.out.println(filepath);
		
		//filename
		//String filename = JsonDate.getProps().getPageProps().getSpace().getHost().getName();
		
		
		// description
		//System.out.println(JsonDate.getProps().getPageProps().getSpace().getDescription());
		
		String description = JsonDate.getProps().getPageProps().getSpace().getDescription();
		
		List<String> data = new ArrayList<>();
		
		if(description.length()==0) {
			
			data.add(null);
			
		}else if(description.length()<18) {
			
			data.add(description);
			
		}else if (description.substring(18).contains("할인")) {
			
			data.add(description.substring(195));
			
		}else {
			data.add(description);
		}
		
		data.forEach(n->System.out.println(n));
		
		//String data = "★★12~1월 제휴 할인 이벤트★★\\r\\n뭉쳐야 싸다!! 친구들을 모으면 가격도 싸다!!\\r\\n\\r\\n1. 예약접수 후 초대링크를 친구들에게 보내고,\\r\\n2. 친구들이 쉐어잇 간편 회원가입 후 예약 참여하기 버튼 클릭하면,\\r\\n3. 최대 15% 할인 받을 수 있어요!!!\\r\\n\\r\\n(인원이 부족하세요?? 실제 공간을 이용하지 않는 친구가 참여해도 가능해요!!)\\r\\n\\r\\n";
		
		
		//System.out.println(data.length());
		
		// 213개 에서 18 개 빼야됌 왜그러냐면  \\r  에서  r 이 문자열 하나가 포함이 안됨
		
	}
}
