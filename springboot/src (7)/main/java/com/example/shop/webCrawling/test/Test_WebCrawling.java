package com.example.shop.webCrawling.test;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.boot.json.JsonParser;

import com.example.shop.webCrawling.dto.Description;
import com.example.shop.webCrawling.dto.JSONPaser2DTO;
import com.example.shop.webCrawling.dto.JsonPaserDTO;
import com.example.shop.webCrawling.dto.TestDTO;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Test_WebCrawling {

	public static void main(String[] args) throws IOException {
		
		String url = "https://shareit.kr/venue/3679";
		
		
		
		url = "https://shareit.kr/venue/3679";
		
		
	
		Document doc =Jsoup.connect(url).timeout(5000)
		        .header("Content-Type", "application/json; charset=UTF-8") // 인코딩 설정
		        .get();
		
		doc.select("link");
		
		
		//System.out.println(doc);
	
		
		//System.out.println(doc.select("script"));
		
		
		
		System.out.println(doc.getElementsByAttributeValue("id","__NEXT_DATA__"));
		
		
		Elements d1 = doc.getElementsByAttributeValue("id","__NEXT_DATA__");
		
		//System.out.println(d1.dataNodes());
		
		//d1.dataNodes().get(0);
		
		//System.out.println(d1.hasText());
		
//		d1.dataNodes().get(0);
		
//		System.out.println(d1.dataNodes().get(0));
		
		String str = d1.dataNodes().get(0).getWholeData().replaceAll("__N_SSG", "nssg");
//		
//		String str2 = 
//				str
//				.replaceAll("\\[]", "\"배열\"")
//				.replaceAll("true", "\"true\"")
//				.replaceAll("false", "\"false\"")
//				.replaceAll("\\[", "")
//				.replaceAll("\\]", "");
//		
//		System.out.println(str2);		
//		
//		//String test = "{\"name\":\\[\\]}";
//		
//		
//		
	
		
		ObjectMapper objectMapper = new ObjectMapper();
	
		JSONPaser2DTO JsonDate 
		= objectMapper.readValue(str, JSONPaser2DTO.class);
		
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		// field 일치하지않는거 무시하겠다는 내용 // 주의 : 원하는 데이턱 안들어갈수있음
			
		
		
		System.out.println(JsonDate);
		
		
	
		//System.out.println(JsonDate.getProps().getPageProps().getSpace().getDescription());  
	   
		//System.out.println(JsonDate.getProps().getPageProps().getSpace().getTags());
		
		//System.out.println(JsonDate.getProps().getPageProps().getSpace().getPhotos().get(0).getFile().getResourcePath());
		
		
		//System.out.println(JsonDate.getProps().getPageProps().getSpace().getHost().getName());		
		
		
		
		
		
		
		System.out.println();
//				JsonDate.getProps()
//				.getPageProps()
//				.getSpace()
//				.getPhotos()
		
		//objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		// field 일치하지않는거 무시하겠다는 내용 // 주의 : 원하는 데이턱 안들어갈수있음
		
			
//		))
	}
	
	
	
}


/*
 * 	{"props":{"pageProps":{"space":{"seq":477,"name":"테니스장/풋살장","description":"*예약 전 아래 설명들을 필독 해주시기 바랍니다.*\r\n(고객 미숙지로 인한 불이익 시 쉐어잇이 책임지지 않습니다.)\r\n\r\n\r\n0. 공통\r\n\r\n★학교 사정으로 인해 예약이 취소될 수 있습니다. \r\n(해당 경우 100% 환불 조치 외에, 별다른 보상이 제공되지 않으니 예약 시에 참고 부탁드립니다.)\r\n\r\n\r\n1. 실시간 ‘생활체육’ 예약 안내\r\n\r\n★공지\r\n예약 과정에서 ′호스트 전달 내용′에 이용하려는 스포츠 종목(ex. 농구, 배구, 배드민턴, 풋살, 축구 등등)을 꼭 적어주세요.\r\n\r\n★가능 종목\r\n: 테니스(정규코트), 풋살(6:6), 기타 실외스포츠\r\n\r\n★예약 가능 일자\r\n: 매월 20일(20일이 휴일인 경우 이후 가장 빠른 평일) 18시 익월 한 달 예약 오픈\r\n(학교 일정에 따라 매월 예약 가능한 일시가 달라지기 때문에 한 달 단위 예약만 가능, 장기대관 불가)\r\n\r\n★공간 규격 정보\r\n1. 공간 전체 가로*세로: 40m*20m\r\n2. 풋살 코트: 6vs6 (40m*20m)\r\n3. 테니스 코트: 정규규격(10.97m*23.78m)\r\n\r\n★시설 및 기자재\r\n1. 사용 가능: 테니스 지주(2ea), 테니스 네트, 풋살장 골대(2ea)\r\n2. 사용 불가능: 기타 체육 시설 및 기자재\r\n3. 야간용 대형 조명(4ea) 제공\r\n\r\n★이용시간\r\n: 정시 입장 정시 퇴장 \r\n(전 시간 이용 고객이 없다면, 시작시간 15분 전부터 입장가능)\r\n\r\n★문의\r\n: 사전\u0026사후 문의는 페이지 상단 ‘문의’ 기능을 통해 확인 가능\r\n현장에서는 스쿨매니저(현장 관리자)에게 문의 (시설 개방 및 요청사항 응대)\r\n\r\n★주차 및 체육관 위치\r\n1. 정문 진입 전 우측 ‘우촌관’ 건물 지하 주차장에 주차 (이외 건물 및 교내 갓길에 주차 불가)\r\n2. 주차 후, 건물 1층으로 올라와 야외로 나가 풋살장으로 이동\r\n3. 주차권(할인권)은 체육관 출입 시, 현장에서 스쿨매니저를 통해 ‘현금’으로만 구매 가능 (5,000원/종일권)\r\n\r\n★기타 사항\r\n1. 입장 시, 출입 체크(QR코드) 필수\r\n2. 음료 이외의 음식물 취식 금지 (지침 및 안내 위반 시 퇴장 조치)\r\n\r\n★기타\r\n1. 쓰레기는 체육관 외부 복도 쓰레기통에 분리수거\r\n2. 환불규정 필수 확인\r\n3. 잔디구장 전용 축구화/풋살화, 테니스화 착용 의무\r\n4. 상황에 따라 이용 시간 내, 스쿨 매니저 도움 하에 ′테니스 네트 설치 및 해체 작업 도움′을 요청 드릴 수 있음 (이용 시간 내, 약 5~10분 소요) \r\n\r\n★오시는 길\r\n: 차량 이용 시 네비에 ‘한성대학교’ 검색, 대중교통 이용 시 한성대입구역/혜화역/창신역에서 하차 후 버스 혹은 도보로 이동(약 10분 소요), 자세한 주소는 아래 ‘위치’ 참고\r\n\r\n★우천 시, 예약 변경 및 100% 환불 기준 (기상청 날씨누리 기준)\r\n-예약 변경: 예약 당일 해당 시간/지역 강수량이 1mm 이상이고, 이용 시작 시간 기준 3시간 전까지 쉐어잇에 요청(전화, 고객센터)한 경우\r\n-100% 환불: 예약 당일 해당 지역에 호우주의보가 발령되고, 이용 시작 시간 기준 3시간 전까지 쉐어잇에 요청(전화, 고객센터)한 경우\r\n\r\n\r\n2. 승인 예약 안내\r\n\r\n★대관 가능 일정 확인\r\n: 파란색 ‘예약’ 버튼 눌러 예약 접수 후 확인 가능\r\n\r\n★시설 및 기자재 혹은 기타 내용 확인\r\n: 페이지 상단 ‘문의’ 기능을 통해 확인 가능","displayType":1,"manageType":1,"favoriteCount":254,"host":{"seq":240,"name":"한성대학교","address":"서울특별시 성북구 삼선교로 16길 116","description":"","type":1,"latitude":37.58267,"longitude":127.010177,"image":{"path":"host/thumb/2021-07-15","name":"9823ab58-f5f5-4bf3-b745-448d977dde1e.jpg","resourcePath":"https://img.shareit.kr/host/thumb/2021-07-15/9823ab58-f5f5-4bf3-b745-448d977dde1e.jpg","empty":false},"building":{"seq":757,"name":"야외시설","latitude":37.582667,"longitude":127.010167}},"photos":[{"seq":60424,"type":"photo","order":2,"file":{"path":"prod/img/2021-12-10","name":"9406fd14-1b2e-420c-bd89-3106ee2ca141.jpg","resourcePath":"https://img.shareit.kr/prod/img/2021-12-10/9406fd14-1b2e-420c-bd89-3106ee2ca141.jpg","empty":false}},{"seq":60425,"type":"photo","order":2,"file":{"path":"prod/img/2021-12-10","name":"bccfe705-bf39-41c3-8e45-39b9278677cf.jpg","resourcePath":"https://img.shareit.kr/prod/img/2021-12-10/bccfe705-bf39-41c3-8e45-39b9278677cf.jpg","empty":false}},{"seq":60427,"type":"photo","order":2,"file":{"path":"prod/img/2021-12-10","name":"60f18d76-86aa-4f43-a643-d2492707939c.jpg","resourcePath":"https://img.shareit.kr/prod/img/2021-12-10/60f18d76-86aa-4f43-a643-d2492707939c.jpg","empty":false}},{"seq":60428,"type":"photo","order":2,"file":{"path":"prod/img/2021-12-10","name":"4988885d-b9b1-47bb-882a-5c067ab9413c.jpg","resourcePath":"https://img.shareit.kr/prod/img/2021-12-10/4988885d-b9b1-47bb-882a-5c067ab9413c.jpg","empty":false}},{"seq":60429,"type":"photo","order":2,"file":{"path":"prod/img/2021-12-10","name":"e3a6d27f-2227-427e-9fc8-2e54c797ad43.jpg","resourcePath":"https://img.shareit.kr/prod/img/2021-12-10/e3a6d27f-2227-427e-9fc8-2e54c797ad43.jpg","empty":false}},{"seq":60430,"type":"photo","order":2,"file":{"path":"prod/img/2021-12-10","name":"cf978ad2-668c-46ba-adcf-e0ff3a3e9b32.jpg","resourcePath":"https://img.shareit.kr/prod/img/2021-12-10/cf978ad2-668c-46ba-adcf-e0ff3a3e9b32.jpg","empty":false}},{"seq":60426,"type":"thumb","order":1,"file":{"path":"prod/img/2021-12-10","name":"749dd11a-4c2f-4c3c-8eba-66a38aa5103f.jpg","resourcePath":"https://img.shareit.kr/prod/img/2021-12-10/749dd11a-4c2f-4c3c-8eba-66a38aa5103f.jpg","empty":false}}],"tags":[],"tips":[],"active":true},"spaceError":null},"__N_SSG":true},"page":"/venue/[venueId]","query":{"venueId":"477"},"buildId":"xhyQpbazfh34Q6YSr5YKP","isFallback":false,"gsp":true,"customServer":true,"scriptLoader":[]}</script>

 * */
 