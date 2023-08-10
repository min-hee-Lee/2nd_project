package com.example.shop.webCrawling.controller;

import java.io.IOException;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.shop.webCrawling.dto.JSONPaser2DTO;
import com.example.shop.webCrawling.dto.JSONPaser2DTO.Photo;
import com.example.shop.webCrawling.dto.images.ImagesDTO;
import com.example.shop.webCrawling.service.Test_Service;
import com.example.shop.webCrawling.service.Test_ServiceImpl;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

//   http://localhost:8090/test/main_sub_banner

@Controller
public class Test_Controller2 {
		
	@Autowired
	private Test_Service service;
	
	@GetMapping("/test/main_sub_banner")
	public void execute() throws IOException {
		
		System.out.println("컨트롤러 호출");
		
		
		
		String[] urlList = {
				// 1. 토모짐(농구/배구 실내체육관)
				"https://shareit.kr/venue/3430",
				// 2. 빅토리스포츠아카데미(농구/배드민턴 실내체육관)
				"https://shareit.kr/venue/1966",
				// 3. 아이스포츠상암(마포,은평,서대문)(농구/배구/배드민턴)
				"https://shareit.kr/venue/3679",
				// 4. 팀리얼 컴퍼니(강동/하남 실내농구장)
				"https://shareit.kr/venue/9494",
				// 5. 코리아바스켓볼아카데미 2호점(하남/농구 실내체육관)
				"https://shareit.kr/venue/8979",
				// 6. 한성대학교(낙산관 실내체육관)
				"https://shareit.kr/venue/478",
				// 7. 경기대학교(본관 실내체육관)
				"https://shareit.kr/venue/502",
				// 8. 명지전문대학(예체능관 실내체육관)
				"https://shareit.kr/venue/573",
				// 9. 가천대학교(비전타워 실내체육관)
				"https://shareit.kr/venue/548",
				// 10. 한성대학교(상상관 실내체육관)
				"https://shareit.kr/venue/476",
				// 11. 유앤아이스포츠 명지대점(풋살/배구/농구/배드민턴)
				"https://shareit.kr/venue/2872",
				// 12. 바스농구클럽 개포점(배구/농구/배드민턴)
				"https://shareit.kr/venue/2864",
				// 13. N sports(서초/농구 실내체육관)
				"https://shareit.kr/venue/4155",
				// 14. 파워스포츠코트(배구/농구/배드민턴)
				"https://shareit.kr/venue/2670",
				// 15. 59스포츠(서대문 실내농구장)
				"https://shareit.kr/venue/6020",
				// 16. 하이피 스포츠센터(농구 대체육관)
				"https://shareit.kr/venue/2702",
				// 17. 퀀텀바스켓볼(농구 실내체육관)
				"https://shareit.kr/venue/4580",
				// 18. 상아스포츠아카데미(배구/농구 실내체육관)
				"https://shareit.kr/venue/8091",
				// 19. 성결대학교(학생회관 실내체육관)
				"https://shareit.kr/venue/506",
				// 20. 올짐 광명점(배구/농구 실내체육관)
				"https://shareit.kr/venue/2473",
				// 21. 리얼농구교실 남양주점(남양주/농구 실내체육관)
				"https://shareit.kr/venue/2833",
				// 22. 서울휘트니스 보라매점(배구/농구 실내체육관)
				"https://shareit.kr/venue/2119",
				// 23. 서일대학교(흥학관 실내체육관)
				"https://shareit.kr/venue/9696",
				// 24. 삼성썬더스 농구클럽 구리다산점(농구/배드민턴 체육관B)
				"https://shareit.kr/venue/3691",
				// 25. 멤버스스포츠아카데미(인천/부평 농구체육관)
				"https://shareit.kr/venue/4141",
				// 26. 팀플러스(분당/수내 농구체육관)
				"https://shareit.kr/venue/3946",
				// 27. 일산 우장체육관(일산/농구 실내체육관)
				"https://shareit.kr/venue/4524",
				// 28. 서울여자대학교(야외시설 체육관)
				"https://shareit.kr/venue/1293",
				
				// 29. 한국외국어대학교 서울캠퍼스(미네르바콤플렉스 실내체육관)
				"https://shareit.kr/venue/9566",
				// 30. 현대레포츠 실내체육관(농구/실내체육 실내체육관)
						
				"https://shareit.kr/venue/10841",
				// 31. 피스톤 체대입시 청담점(배구/농구 실내체육관)
				"https://shareit.kr/venue/6908",
				// 32. 유앤아이스포츠 이대점(서대문/유아 실내체육관)
				"https://shareit.kr/venue/4261",
				// 33. 유고걸(강남/다목적 실내체육관)
				"https://shareit.kr/venue/7450",
				// 34. 이츠발리 배구 트레이닝센터(반포/강남 실내배구장)
				
				"https://shareit.kr/venue/6797",
				// 35. 서경대학교(수인관 실내체육관)
				"https://shareit.kr/venue/6437",
				// 36. 삼성리틀썬더스 서초점(농구/배구 A코트)
				"https://shareit.kr/venue/904",
				// 37. 삼성썬더스 농구클럽 구리다산점(농구/배드민턴 체육관A)
				"https://shareit.kr/venue/3690",
				// 38. 어시스트(인천/농구 실내체육관)
				"https://shareit.kr/venue/6060",
				// 39. 구리토평체육관(농구/배드민턴 체육관)
				"https://shareit.kr/venue/3804",
				// 40. 경희스포츠 아카데미 광명점(배구/농구 실내체육관)
				"https://shareit.kr/venue/1888",
				// 41. 9 Street(남양주/농구 실내체육관)
				"https://shareit.kr/venue/4147",
				// 42. 경희스포츠 제1실내 농구장 노온사점(광명/농구 실내농구장)
				"https://shareit.kr/venue/2081",
				// 43. GPNB(강남/농구 실내체육관)
				"https://shareit.kr/venue/2076",
				// 44. 경희대학교(네오르네상스 체육관)
				"https://shareit.kr/venue/778",
				// 45. 상암체육관(마포/농구 실내체육관)
				"https://shareit.kr/venue/10621",
				// 46. (주)반포중앙스포츠 서초점(서초/농구 체육관부분1)
				"https://shareit.kr/venue/2721",
				// 47. 노리터 체육관 서초점(농구/배구/배드민턴)
				"https://shareit.kr/venue/4563",
				// 48. 가천대학교(메디컬)(체육관 실내체육관)
				"https://shareit.kr/venue/596",
				// 49. 플레이존 농구장(강남/농구 실내체육관)
				"https://shareit.kr/venue/9715",
				// 50. 삼성리틀썬더스 서초점(농구/배구 B코트)
				"https://shareit.kr/venue/6831",
				// 51. 쿨스포츠클럽(농구/배드민턴 체육관)
				"https://shareit.kr/venue/3231",
				// 52. 맥스체대입시 노원교육원(노원/생활체육 스포츠)
				"https://shareit.kr/venue/1759",
				// 53. 삼성리틀썬더스 시흥점(시흥/농구 실내체육관)
				"https://shareit.kr/venue/9755",
				// 54. 인아우트(농구 실내체육관)
				"https://shareit.kr/venue/1726",
				// 55. 고스포츠 호평점(농구/배드민턴 체육관)
				"https://shareit.kr/venue/5868",
				// 56. ATB 송파위례점(송파/농구 실내체육관)
				"https://shareit.kr/venue/7785",
				// 60. 퍼시픽스포츠그룹 강서점(농구/배드민턴 체육관B)
						"https://shareit.kr/venue/9798",
				// 57. sk주니어나이츠 남양주점(농구/배드민턴 체육관)
				"https://shareit.kr/venue/3655",
				// 58. 아이픽스포츠아카데미(배구/농구/배드민턴)
				"https://shareit.kr/venue/3305",
				// 59. 맥스체대입시 송파교육원(송파/생활체육 지하2층)
				"https://shareit.kr/venue/2401",
				
				// 61. 리얼농구교실 구리점(구리/농구 실내체육관)
				"https://shareit.kr/venue/5829",
				// 62. KBC코리아농구교실실 동탄2지점(화성/동탄 실내농구장)
				"https://shareit.kr/venue/4440",
				// 63. 런앤짐 풋살/농구장(남양주/농구 실내체육관)
				"https://shareit.kr/venue/3818",
				// 64. ES스포츠 감정점(배구/농구/배드민턴)
				"https://shareit.kr/venue/3635",
				// 65. M&M 농구교실(인천/농구 실내체육관)
				"https://shareit.kr/venue/4297",
				// 66. 서초동 올어바웃스포츠(서초/생활체육 체육관)
				"https://shareit.kr/venue/1775",
				// 67. 제이원 스포츠클럽(광명/농구 실내체육관)
				"https://shareit.kr/venue/2682",
				// 68. 명지대학교(자연)(체육관 실내체육관)
				"https://shareit.kr/venue/643",
				// 69. 경희대학교(국제)(선승관 실내체육관)
				"https://shareit.kr/venue/539",
				// 70. 스킬팩토리 주니어(농구/배드민턴 체육관)
				"https://shareit.kr/venue/6130",
				// 71. 대한체육교육원(동탄/농구 실내체육관)
				"https://shareit.kr/venue/3629",
				// 72. 토모풋살블랙피치(동대문/풋살 실내풋살장)
				"https://shareit.kr/venue/2089",
				// 73. 퍼시픽스포츠그룹 강서점(농구/배드민턴 체육관A)
				"https://shareit.kr/venue/9797",
				// 74. PEC 챔피언스파크 구성점(용인/농구 실내체육관)
				"https://shareit.kr/venue/10446",
				// 75. 코리아바스켓볼아카데미 1호점(하남 실내농구장)
				"https://shareit.kr/venue/6283",
				// 76. KBC코리아농구교실 서구점(농구/배드민턴 체육관)
				"https://shareit.kr/venue/6084",
				// 77. 바스농구클럽 매봉점(강남/농구 실내체육관)
				"https://shareit.kr/venue/2865",
				// 78. 허재 농구 아카데미(농구/배드민턴 체육관)
				"https://shareit.kr/venue/6190",
				// 79. 미래아이 농구장(광명 실내농구장)
				"https://shareit.kr/venue/6165",
				// 80. 전자랜드 교육 연수원(인천/농구 실내체육관)
				"https://shareit.kr/venue/5711",
				// 81. LG세이커스 유소년 농구클럽 하남점(하남/농구 실내농구장)
				"https://shareit.kr/venue/1679",
				// 82. 에이윈민턴아카데미 청담점(서울/강남 배드민턴)
				"https://shareit.kr/venue/4454",
				// 83. 고스포츠평내점(남양주/농구 실내체육관)
				"https://shareit.kr/venue/2754",
				// 84. 와이앤씨스포츠(도봉/풋살 실내체육관)
				"https://shareit.kr/venue/2166",
				// 85. 스위스팟사커스포츠(서초/풋살 실내풋살장)
				"https://shareit.kr/venue/1975",
				// 86. 뚜존체육관(농구/배구/배드민턴)
				"https://shareit.kr/venue/6252",
				// 87. 월드레포츠클럽(서초/방배 체육관 3층)
				"https://shareit.kr/venue/4333",
				// 88. 윙스스포츠(농구/용인 신체육관)
				"https://shareit.kr/venue/7918",
				// 89. 엘리트 스포츠 농구클럽(김포/농구 실내체육관)
				"https://shareit.kr/venue/4523",
				// 90. (주)반포중앙스포츠 서초점(서초/농구 체육관부분7)
				"https://shareit.kr/venue/2727",
				// 91. 국제대학교(창조관 실내체육관)
				"https://shareit.kr/venue/1121",
				// 92. 피스톤 체대입시 송파점(송파/농구 실내체육관)
				"https://shareit.kr/venue/11386",
				// 93. 디원파크(양주/농구 실내체육관)
				"https://shareit.kr/venue/1185",
				// 94. 경희대학교(국제)(체육대학관 농구장)
				"https://shareit.kr/venue/735",
				// 95. 맥스체대입시 송파교육원(송파/생활체육 지하1층)
				"https://shareit.kr/venue/2398",
				// 96. SK주니어나이츠 고양점(고양/농구 실내체육관)
				"https://shareit.kr/venue/11232",
				// 97. 파시온 축구클럽(중구/풋살 실내풋살장)
				"https://shareit.kr/venue/2035",
				// 98. 익투스포츠(시흥/농구 실내체육관)
				"https://shareit.kr/venue/9877",
				// 99. PEC스포츠아카데미 드림파크점(용인/농구 실내체육관)
				"https://shareit.kr/venue/10124",
				// 100. KBD코리아 농구교실 부평센터(인천/농구 실내체육관)
				"https://shareit.kr/venue/6113",
				// 101. PEC스포츠아카데미 망포점(수원/다목적 프리미어)
				"https://shareit.kr/venue/9352",
				// 102. 팀리얼농구교실 덕소점(하남/남양주 실내체육관)
				"https://shareit.kr/venue/8109",
				// 103. 패스체대입시 송파위례센터(패스체대입시 송파위례센터)
				"https://shareit.kr/venue/5686",
				// 104. (주)반포중앙스포츠 반포점(서초/농구 체육관부분2)
				"https://shareit.kr/venue/2744",
				// 105. 서울휘트니스 보라매점(영등포/체육 실내풋살장)
				"https://shareit.kr/venue/2120",
				// 106. 코코풀(동대문/수영 실내체육관)
				"https://shareit.kr/venue/1870",
				// 107. 케이케이 주니어(강남/서초 실내체육관)
				"https://shareit.kr/venue/9143",
				// 108. 운정 실내체육관(농구/배드민턴)(운정/농구 실내체육관)
				"https://shareit.kr/venue/9554",
				// 109. 스킬팩토리(농구 실내체육관)
				"https://shareit.kr/venue/6406",
				// 110. 월드레포츠클럽(서초/방배 체육관2층)
				"https://shareit.kr/venue/4302",
				// 111. 포틴체육관(일산/농구 실내체육관)
				"https://shareit.kr/venue/11717",
				// 112. 인사이드 바스켓볼(인사이드 바스켓볼)
				"https://shareit.kr/venue/8051",
				// 113. 월드레포츠클럽(서초/방배 체육관 지층)
				"https://shareit.kr/venue/4332",
				// 114. (주)반포중앙스포츠 서초점(서초/농구 체육관부분5)
				"https://shareit.kr/venue/2725",
				// 115. 맥스체대입시 강남교육원(강남/생활체육 스포츠)
				"https://shareit.kr/venue/1739",
				// 116. 천호복싱다이어트(강동/복싱 실내체육관)
				"https://shareit.kr/venue/1682",
				// 117. 맥스체대입시 관악교육원(관악/생활체육 스포츠)
				"https://shareit.kr/venue/1921",
				// 118. 상암스포츠타운(농구장)(서울/농구 실내체육관1)
				"https://shareit.kr/venue/4653",
				// 119. 리치유소년축구클럽(구로/풋살 실내풋살장)
				"https://shareit.kr/venue/1918",
				// 120. 인왕중학교(본관 실내체육관)
				"https://shareit.kr/venue/10740",
				// 121. PEC스포츠아카데미 망포점(수원/다목적 세리에A)
				"https://shareit.kr/venue/9350",
				// 122. 유앤아이스포츠 이대점(서대문/체육관 2층)
				"https://shareit.kr/venue/4537",
				// 123. 무브짐(영등포/헬스 실내체육관)
				"https://shareit.kr/venue/1672",
				// 124. 윙스스포츠(농구/배드민턴 구체육관)
				"https://shareit.kr/venue/7916",
				// 125. 런앤점프체육교실(안양/다목적 실내체육관)
				"https://shareit.kr/venue/6996",
				// 126. (주)반포중앙스포츠 서초점(서초/농구 체육관부분4)
				"https://shareit.kr/venue/2724",
				// 127. 을지대학교 성남캠퍼스(지천관 실내체육관)
				"https://shareit.kr/venue/6471",
				// 128. 단국대학교(죽전)(체육관 주경기장)
				"https://shareit.kr/venue/693",
				// 129. KBC코리아농구교실 일산점(일산/농구 실내체육관)
				"https://shareit.kr/venue/6180",
				// 130. KBC코리아농구교실 김포1지점(김포/농구 실내체육관)
				"https://shareit.kr/venue/6085",
				// 131. 토모짐(답십리/농구 트레이닝장)
				"https://shareit.kr/venue/3431",
				// 132. 에이윈민턴 마포점(서울/마포 배드민턴)
				"https://shareit.kr/venue/4464",
				// 133. 서울휘트니스 목동본점(목동/농구 실내농구장)
				"https://shareit.kr/venue/2117",
				// 134. 하이피 스포츠센터(농구 소체육관)
				"https://shareit.kr/venue/11719",
				// 135. 김포 오리온 체육관(김포/농구 실내체육관)
				"https://shareit.kr/venue/6952",
				// 136. 파주 운정 월드드림 농구교실(농구 시설 대관)
				"https://shareit.kr/venue/6136",
				// 137. JYB스포츠농구교실(평택/농구 실내체육관)
				"https://shareit.kr/venue/3634",
				// 138. 히터스스포츠 기흥점(루프탑 테니스코트)
				"https://shareit.kr/venue/9536",
				// 139. 유앤아이스포츠 연대점(서대문/체육관 생활체육)
				"https://shareit.kr/venue/4263",
				// 140. 로드짐로데오점(격투기 PT샵)
				"https://shareit.kr/venue/3669",
				// 141. 바스농구클럽 군포점(안양/의왕/군포 실내체육관)
				"https://shareit.kr/venue/11066",
				// 142. 엑시토스포츠 배구아카데미(서울/배구/배드민턴 체육관)
				"https://shareit.kr/venue/9503",
				// 143. 키움스포츠 농구교실(양주/농구 실내농구장)
				"https://shareit.kr/venue/9452",
				// 144. (주)반포중앙스포츠 서초점(서초/농구 체육관부분6)
				"https://shareit.kr/venue/2726",
				// 145. 퍼시픽스포츠그룹 영통광교점(수원/농구 실내체육관A)
				"https://shareit.kr/venue/12035",
				// 146. 고싱가의 숲(도심 속 요가 명상실)
				"https://shareit.kr/venue/4206",
				// 147. (주)반포중앙스포츠 반포점(서초/농구 체육관부분1)
				"https://shareit.kr/venue/2742",
				// 148. (주)반포중앙스포츠 서초점(서초/농구 체육관부분2)
				"https://shareit.kr/venue/2722",
				// 149. 경희스포츠 제1실내농구장 노온사점(광명/풋살 실내풋살장)
				"https://shareit.kr/venue/2082",
				// 150. 체대입시FA 성북캠퍼스(성북/체육관 실내체육관)
				"https://shareit.kr/venue/10701",
				// 151. ES스포츠 고촌점(배구/농구/배드민턴)
				"https://shareit.kr/venue/8059",
				// 152. H풋볼클럽(고양/일산 실내풋살장)
				"https://shareit.kr/venue/1757",
				// 153. PEC스포츠 아카데미 동탄점 1체육관(동탄 실내 A체육관)
				"https://shareit.kr/venue/10431",
				// 154. 어서오짐(어서오짐)
				"https://shareit.kr/venue/6808",
				// 155. 상암스포츠타운(농구장)(서울/농구 실내체육관2)
				"https://shareit.kr/venue/4658",
				// 156. 써밋바스켓볼(써밋바스켓볼 농구센터)
				"https://shareit.kr/venue/6163",
				// 157. (주)반포중앙스포츠 서초점(서초/농구 체육관부분3) 157
				"https://shareit.kr/venue/2723",
				
				// 158. 인천 위플레이 스포츠(위플레이 스포츠)
				"https://shareit.kr/venue/11502",
				// 159. 얼라이브 스포츠 세곡점(얼라이브 스포츠 세곡점)
				"https://shareit.kr/venue/11458",
				// 160. 골든에이지 축구교실(중랑구 풋살장 대관)
				"https://shareit.kr/venue/6158",
				// 161. TH용인유도체육관(은평/유도 실내체육관)
				"https://shareit.kr/venue/1880",
				// 162. 맥스체대입시 광진교육원(광진/생활체육 스포츠)
				"https://shareit.kr/venue/1814",
				// 163. 토모풋살블루피치(동대문/풋살 실내 풋살장)
				"https://shareit.kr/venue/11508",
				// 164. KBC코리아농구교실 청라점(배드민턴/농구 체육관)
				"https://shareit.kr/venue/6018",
				// 165. 축구의 신 아카데미(인천/축구 실내풋살장)
				"https://shareit.kr/venue/4079",
				// 166. 퍼시픽스포츠그룹 영통광교점(수원/농구 실내체육관B)
				"https://shareit.kr/venue/12037",
				// 167. 언더커버 송파(빈티지.인더스트리얼)
				"https://shareit.kr/venue/9845",
				// 168. 더원복싱스타디움(서초/양재 실내복싱장)
				"https://shareit.kr/venue/3640",
				// 169. 퍼시픽스포츠그룹 강서점(풋살/축구 실내체육관C) 170
				"https://shareit.kr/venue/9816",
				// 170. PEC스포츠아카데미 망포점(수원/다목적 프리메라리가)
				"https://shareit.kr/venue/9355",
				// 171. 던휘트니스(강남/헬스 실내체육관)
				"https://shareit.kr/venue/2196",
				// 172. 조이테니스아카데미 가산점(금천/테니스 실내체육관)
				"https://shareit.kr/venue/2148",
				// 173. 한성대학교(상상관 G.X.룸)
				"https://shareit.kr/venue/554",
				// 174. 서울휘트니스 목동본점(양천/풋살 실내풋살장)
				"https://shareit.kr/venue/2118",
				// 175. 퍼시픽스포츠그룹 강서점(풋살/축구 실내체육관B)
				"https://shareit.kr/venue/9815",
				// 176. 글램핏 PT&필라테스(2번룸 헬스 PT)
				"https://shareit.kr/venue/6433",
				// 177. 박성배농구교실(의정부실내체육관)
				"https://shareit.kr/venue/6405",
				// 178. 운동창고PT 면목(중랑/헬스 실내체육관)
				"https://shareit.kr/venue/2221",
				// 179. SJ 풋볼 아카데미(동작/풋살 실내풋살장)
				"https://shareit.kr/venue/1877",
				// 180. 맥스체대입시 일산교육원(일산/생활체육 스포츠) // 181
				"https://shareit.kr/venue/1834",
				// 181. 클럽 롤러힐(동대문/롤러 실내롤러장)
				"https://shareit.kr/venue/1793",
				// 182. 퍼시픽스포츠그룹 영통광교점(수원/풋살 실내풋살장)
				"https://shareit.kr/venue/12038",
				// 183. ATS 스포츠센터(인천/농구/배드민턴 실내체육관)
				"https://shareit.kr/venue/12020",
				// 184. 삼성리틀썬더스 목동점(삼성리틀썬더스 목동점)
				"https://shareit.kr/venue/11499",
				// 185. PEC스포츠아카데미 동탄점 1체육관(동탄 실내B체육관)
				"https://shareit.kr/venue/10436",
				// 186. 에이플러스센터(안양/군포 배드민턴장)
				"https://shareit.kr/venue/5990",
				// 187. 유앤아이스포츠 이대점(서대문/체육관 3층)
				"https://shareit.kr/venue/4538",
				// 188. (주)반포중앙스포츠 반포점(서초/농구 체육관전체)
				"https://shareit.kr/venue/2708",
				// 189. 리얼핏pt(서초/필라테스 체육관)
				"https://shareit.kr/venue/2299",
				// 190. PEC스포츠아카데미 망포점(수원/다목적 분데스리가)
				"https://shareit.kr/venue/9354",
				// 191. 블루마린 아쿠아스쿨(시흥/은계 어린이수영장)
				"https://shareit.kr/venue/4458",
				// 192. 하랑스포츠아카데미(남양주/농구 실내체육관)
				"https://shareit.kr/venue/3725",
				// 193. 리얼핏pt(서초/크로스핏 체육관)
				"https://shareit.kr/venue/2300",
				// 194. 머슬스푼 스튜디오(마포/크로스핏 체육관1)
				"https://shareit.kr/venue/2237",
				// 195. 맥스체대입시 안양교육원(안양/생활체육 스포츠)
				"https://shareit.kr/venue/1818",
				// 196. SH스포츠센터(시흥/농구/배드민턴 실내체육관)
				"https://shareit.kr/venue/11959",
				// 197. 비트바스켓볼(용인/화성/수원농구 실내체육관)
				"https://shareit.kr/venue/11898",
				// 198. 퍼시픽스포츠그룹 강서점(촬영 및 행사 체육관 통대관)
				"https://shareit.kr/venue/10912",
				// 199. 체대입시FA 광진캠퍼스(광진/체육관 실내체육관)
				"https://shareit.kr/venue/10702",
				// 200. PEC스포츠아카데미 망포점(수원/다목적 대형체육관)
				"https://shareit.kr/venue/9349",
				// 201. 광명팩토리배드민턴(광명/배드민턴 코트A)
				"https://shareit.kr/venue/6833",
				// 202. 히터스스포츠 처인점(베이스볼센터)(용인/야구 실내외연습장)
				"https://shareit.kr/venue/6807",
				// 203. 글램핏PT%필라테스(4번룸 헬스 PT)
				"https://shareit.kr/venue/6435",
				// 204. 유앤아이스포츠 이대점(서대문/체육관 4층)
				"https://shareit.kr/venue/4539",
				// 205. 에이윈민턴 잠실석촌호수점(서울/잠실 배드민턴)
				"https://shareit.kr/venue/4233",
				// 206. 하랑스포츠아카데미(남양주/체조 실내체육관)
				"https://shareit.kr/venue/3726",
				// 207. 리본휘트니스(수지)(용인/헬스 실내체육관)
				"https://shareit.kr/venue/2849",
				// 208. 힐스포파크 동대문 힐 스쿼시(동대문/스쿼시 체육관)
				"https://shareit.kr/venue/2163",
				// 209. 맥스체대입시 동탄교육원(화성/생활체육 스포츠)
				"https://shareit.kr/venue/1867",
				// 210. 비스타농구교실 가좌센터(비스타농구교실 가좌센터)
				"https://shareit.kr/venue/12672",
				// 211. 코리아 체대입시학원(평택/안성 농구/배드민턴 실내체육관)
				"https://shareit.kr/venue/11388",
				// 212. 비바스포츠(비바스포츠)
				"https://shareit.kr/venue/11060",
				// 213. 코오버코칭코리아(용인/풋살 실내풋살장)
				"https://shareit.kr/venue/10906",
				// 214. 노리터 체육관 기흥점(풋살 실내체육관)
				"https://shareit.kr/venue/9510",
				// 215. 히터스스포츠 권선점(수원/테니스 실내테니스)
				"https://shareit.kr/venue/6812",
				// 216. 중랑축구센터 풋살파크(중랑축구센터 풋살파크)
				"https://shareit.kr/venue/6506",
				// 217. 락트리클라이밍 강남(논현 실내 암벽등반)
				"https://shareit.kr/venue/5910",
				// 218. 와우배드민턴센터(양주/배드민턴 4코트)
				"https://shareit.kr/venue/5709",
				// 219. 에스엔씨피지컬센터(방배/트레이닝 크로스핏)
				"https://shareit.kr/venue/3456",
				// 220. 식스팩스토어(성남/분당 헬스PT)
				"https://shareit.kr/venue/3296",
				// 221. (주)반포중앙스포츠 서초점(서초/농구 체육관전체)
				"https://shareit.kr/venue/2707",
				// 222. 머슬스푼 스튜디오(마포/크로스팟 체육관2)
				"https://shareit.kr/venue/2238",
				// 223. 퍼펙트한양(퍼펙트한양 동작/크로스핏 체육관)
				"https://shareit.kr/venue/2158",
				// 224. 킹콩복싱점 길동점(강동/복싱 실내체육관)
				"https://shareit.kr/venue/2032",
				// 225. 트라움스포츠(농구/배드민턴 실내체육관)
				"https://shareit.kr/venue/12295",
				// 226. 체대입시FA 은평 제2캠퍼스(은평/실내 실내체육관)
				"https://shareit.kr/venue/11065",
				// 227. 체대입시 FA 강북캠퍼스(강북/체육관 실내체육관)
				"https://shareit.kr/venue/10700",
				// 228. 라인업스포츠(실내 트레이닝룸)
				"https://shareit.kr/venue/9646",
				// 229. PEC스포츠아카데미 망포점(수원/다목적 K리그클래식)
				"https://shareit.kr/venue/9356",
				// 230. 와이디배드민턴센터 인천점(배드민턴 체육관 전체)
				"https://shareit.kr/venue/8603",
				// 231. 플라톤스포츠(제1체육관)
				"https://shareit.kr/venue/7984",
				// 232. 에이윈민턴 스킬트레이닝센터 하남미사점(하남/미사 배드민턴)
				"https://shareit.kr/venue/4444",
				// 233. 팀플러스(팀플체대입시/팀플점)(분당/수내 실내체육관)
				"https://shareit.kr/venue/3975",
				// 234. 명포헬스피아(중구/을지로 헬스장)
				"https://shareit.kr/venue/2844",
				// 235. 맥스체대입시 대전교육원(농구/실내체육관)
				"https://shareit.kr/venue/2624",
				// 236. 신촌꾼낚시(마포/신촌 실내낚시터)
				"https://shareit.kr/venue/2453",
				// 237. 익사이팅 펀치 짐(강남/서초 실내복싱장)
				"https://shareit.kr/venue/2430",
				// 238. 프로핏짐(강남/헬스 실내체육관)
				"https://shareit.kr/venue/2335",
				// 239. 히스토리짐(Hestory 서초/헬스 실내체육관)  241 -1 
				"https://shareit.kr/venue/2064",
				// 240. 포울 실내풋살장(부천/풋살 실내풋살장)
				"https://shareit.kr/venue/1816",
				// 241. 경동대학교 양주캠퍼스(충효관 무도장)
				"https://shareit.kr/venue/1086",
				// 242. 인테리어 잘 된 자연광 스튜디오(단독사용 23평 인테리어 잘 된 자연광 스튜디오)
				"https://shareit.kr/venue/10654",
				// 243. 상섬리틀썬더스 아산점(아산/농구 실내체육관)
				"https://shareit.kr/venue/10435",
				// 244. PEC스포츠아카데미 영통점(수원/풋살장 실내풋살장)
				"https://shareit.kr/venue/10080",
				// 245. 세종맥스스포츠센터(농구/배구 실내체육관)
				"https://shareit.kr/venue/9643",
				// 246. 신안산대학교(체육관 실내체육관)
				"https://shareit.kr/venue/8242",
				// 247. SDTA태권도교육관(실내운동시설)
				"https://shareit.kr/venue/7460",
				// 248. 경희스포츠아카데미(오산/농구 실내체육관)
				"https://shareit.kr/venue/6659",
				// 249. 글램핏PT&필라테스(1번룸 필라테스)
				"https://shareit.kr/venue/6431",
				// 250. 타잔101 클라이밍 압구정점(압구정 실내암벽)
				"https://shareit.kr/venue/6016",
				// 251. 비숏 클라이밍(노원 실내 암벽)
				"https://shareit.kr/venue/5854",
				// 252. 키즈필 키즈카페(노원/반모임/생일파티)
				"https://shareit.kr/venue/4663",
				// 253. 고고랜드 롤러스케이트장 남양주점(남양주/평내 실내롤러장)
				"https://shareit.kr/venue/4455",
				// 254. 하랑스포츠아카데미(남양주/풋살 실내체육관)
				"https://shareit.kr/venue/3724",
				// 255. 오운스테이지(Health Room)
				"https://shareit.kr/venue/3676",
				// 256. 소울앤바디(서초/헬스 실내체육관)
				"https://shareit.kr/venue/2491",
				// 257. 코리안복싱클럽(동작/복싱 실내체육관)
				"https://shareit.kr/venue/1516",
				// 258. 투윈스포츠고양점(어썸투윈아카데미)
				"https://shareit.kr/venue/12375",
				// 259. 웨이브스포츠클럽춘천(웨이브스포츠클럽춘천)
				"https://shareit.kr/venue/11393",
				// 260. 러쉬클랜PT피티(러쉬클랜 헬스 PT)
				"https://shareit.kr/venue/10719",
				// 261. 체대입시 FA 은평 제1캠퍼스(은평/실내 실내체육관)
				"https://shareit.kr/venue/10699",
				// 262. 삼성리틀썬더스 배방점(아산/농구 실내체육관)
				"https://shareit.kr/venue/10433",
				// 263. 서울 홍대 1시간 기구필라테스스튜디오(홍대 기구필라테스 이용권)
				"https://shareit.kr/venue/9075",
				// 264. 와이디배드민턴센터 인천점(인천/배드민턴 코트A)
				"https://shareit.kr/venue/8313",
				// 265. KBC코리아농구교실 남동점(인천/농구 실내체육관)
				"https://shareit.kr/venue/6116",
				// 266. 경희스포츠 노량진점(노량진/생활체육 체육관)
				"https://shareit.kr/venue/5851",
				// 267. 와우배드민턴센터(양주/배드민턴 3코트)
				"https://shareit.kr/venue/5708",
				// 268. 와우배드민턴센터(양주/배드민턴 1코트)
				"https://shareit.kr/venue/4645",
				// 269. 어반프라이빗짐(강남/헬스 실내체육관)
				"https://shareit.kr/venue/3571",
				// 270. 라운지 오브 디온(서초/방배 헬스PT)
				"https://shareit.kr/venue/2234",
				// 271. 구룡복싱(서초/복싱 실내체육관)
				"https://shareit.kr/venue/1891",
				// 272. 동대문/야구 실내야구연습장(토모베이스볼(TM베이스볼)
				"https://shareit.kr/venue/1881",
				// 273. 맥스체대입시 인천계양교육원(인천/헬스 실내체육관)
				"https://shareit.kr/venue/1794",
				// 274. X텐 실내양궁장 역삼점(강남/양궁 실내체육관)
				"https://shareit.kr/venue/1725",
				// 275. 퍼시픽스포츠그룹 영통청명점(수원/풋살 실내풋살장)
				"https://shareit.kr/venue/12039",
				// 276. 스킬팩토리 전주(스킬팩토리 전주)
				"https://shareit.kr/venue/11462",
				// 277. KBA농구교실(KBA농구교실)
				"https://shareit.kr/venue/11324",
				// 278. 패스체대입시 동대문센터(패스체대입시 동대문센터)
				"https://shareit.kr/venue/11233",
				// 279. 히터스스포츠 가산점(테니스/야구 실내체육관)
				"https://shareit.kr/venue/9533",
				// 280. 스윙필라테스(홍대기구필라테스 단독점유)
				"https://shareit.kr/venue/9468",
				// 281. 아이엠휘트니스&필라테스(아이엠휘트니스)
				"https://shareit.kr/venue/9058",
				// 282. 에스에스씨 운동과학센터(시흥/은계 피지컬센터)
				"https://shareit.kr/venue/4459",
				// 283. 뷰티풀 피트니스(하남/미사 헬스PT)
				"https://shareit.kr/venue/4338",
				// 284. 리얼핏pt(서초/헬스 PT 체육관)
				"https://shareit.kr/venue/2297",
				// 285. 맥스체대입시 인천서구교육원(인천/생활체육 스포츠)
				"https://shareit.kr/venue/2106",
				// 286. 맥스체대입시 인천계양교육원(인천/생활체육 스포츠)
				"https://shareit.kr/venue/1790",
				// 287. 디원파크(양주/풋살 실내풋살장)
				"https://shareit.kr/venue/1186",
				// 288. 경희대학교(국제)(체육대학관 태백도장 B119)
				"https://shareit.kr/venue/730",
				// 289. 클로스 스포츠센터(크로스 스포츠센터)
				"https://shareit.kr/venue/12971",
				// 290. 락스포츠타운(인천서구/청라/검단 농구)
				//"https://shareit.kr/venue/12728",
				// 291. 패스체대입시 시흥센터(패스체대입시 시흥 체육관)
				"https://shareit.kr/venue/9699",
				// 292. 맥스체대입시 수지교육원(실내체육시설)
				"https://shareit.kr/venue/9576",
				// 293. 세종시포츠센터(실내 체육관)
				"https://shareit.kr/venue/8112",
				// 294. 클라필라테스 가좌점(클라필라테스)
				"https://shareit.kr/venue/8038",
				// 295. 컬쳐연구소(필라테스 3:1룸)
				"https://shareit.kr/venue/6827",
				// 296. 화창실내풋살장(화창 실내 풋살장)
				"https://shareit.kr/venue/6327",
				// 297. 오운스테이지(유산소 Zone)
				"https://shareit.kr/venue/5849",
				// 298. 와우배드민턴센터(양주/배드민턴 2코트)
				"https://shareit.kr/venue/5707",
				// 299. 스포넷마트배뉴(배드민턴 실내체육관)
				"https://shareit.kr/venue/4581",
				// 300. 고고랜드 롤러스케이트장 안양범계역점(안양/범계 실내롤러장)
				"https://shareit.kr/venue/4456",
				// 301. 고고랜드 롤러스케이트장 일산점(일산/고양 실내롤러장)
				"https://shareit.kr/venue/4453",
				// 302. 대한합기도(구로/합기도 실내체육관)
				"https://shareit.kr/venue/4133",
				// 303. 포천 베스트원(포천/축구 실내풋살장)
				"https://shareit.kr/venue/3823",
				// 304. 유앤아이스포츠 명지대점(서대문/유아 생활체육)
				"https://shareit.kr/venue/3712",
				// 305. 퍼펙트한양(퍼펙트한양 동작/육상 실내체육관)
				"https://shareit.kr/venue/2159",
				// 306. 바디밸런스(분당/헬스 실내체육관)
				"https://shareit.kr/venue/2022",
				// 307. 맥스체대입시 이천교육원(이천/생활체육 스포츠)
				"https://shareit.kr/venue/1932",
				// 308. 마스터즈테니스아카데미(성남/테니스 분당체육관)
				"https://shareit.kr/venue/1920",
				// 309. WB(성남/레슬링 실내체육관)
				"https://shareit.kr/venue/1882",
				// 310. 케이케이엠 축구교실(파주/풋살 실내풋살장A)
				"https://shareit.kr/venue/1857",
				// 311. 단국대학교(죽전)(체육관 스쿼시장)
				"https://shareit.kr/venue/873",
				// 312. 경희대학교(국제)(체육대학관 유도장)
				"https://shareit.kr/venue/731",
				// 313. 고릴라짐 농구클럽(고릴라짐 농구센터)
				"https://shareit.kr/venue/12926",
				// 314. 바로스포츠센터(바로체육관)
				"https://shareit.kr/venue/12800",
				// 315. 송파구 실내 체육관(송파구 실내 체육관)
				"https://shareit.kr/venue/12786",
				// 316. ATS 스포츠센터(인천/수영 실내수영장)
				"https://shareit.kr/venue/12022",
				// 317. ATS 스포츠센터(인천/풋살 실내풋살장)
				"https://shareit.kr/venue/12021",
				// 318. 플렉스체대입시 서울광명교육원(서울광명/생활체육 스포츠)
				"https://shareit.kr/venue/11063",
				// 319. 빅토리 배드민턴(실내 배드민턴 전체 A+B코트)
				"https://shareit.kr/venue/10642",
				// 320. 벌키농구교실(실내체육관)
				"https://shareit.kr/venue/10533",
				// 321. 빅토리 배드민턴(실내 배드민턴 B코트)
				"https://shareit.kr/venue/10532",
				// 322. 빅토리 배드민턴(실내 배드민턴 A코트)
				"https://shareit.kr/venue/10529",
				// 323. 퍼시픽스포츠그룹 강서점(풋살/축구 실내체육관A)
				"https://shareit.kr/venue/9814",
				// 324. 와이디배드민턴센터 인천점(인천/배드민턴 코트D)
				"https://shareit.kr/venue/8316",
				// 325. 와이디배드민턴센터 인천점(인천/배드민턴 코트C)
				"https://shareit.kr/venue/8315",
				// 326. 와이디배드민턴센터 인천점(인천/배드민턴 코트B)
				"https://shareit.kr/venue/8314",
				// 327. 아트필라테스 청담본사(아트 필라테스)
				"https://shareit.kr/venue/8308",
				// 328. 파랑새스포츠센터(농구/배드민턴/배구 체육관)
				"https://shareit.kr/venue/8095",
				// 329. 글램핏PT&필라테스(3번룸 필라테스)
				"https://shareit.kr/venue/6434",
				// 330. 안산베이스캠프클라이밍(안산/실내 암벽등반)
				"https://shareit.kr/venue/6014",
				// 331. 목동클라이밍센터(양천 목동/실내 암벽등반)
				"https://shareit.kr/venue/5968",
				// 332. 원썸짐(상왕십리/동대문 헬스장)
				"https://shareit.kr/venue/5902",
				// 333. 원스모어짐(강남/헬스 실내체육관)
				"https://shareit.kr/venue/5900",
				// 334. 에이짐필라테스(은평/필라테스 플라이빗)
				"https://shareit.kr/venue/4068",
				// 335. 파워유소년스포츠(남양주/GX 실내체육관)
				"https://shareit.kr/venue/3859",
				// 336. 스피나 필라테스(성남/필라테스 체육관)
				"https://shareit.kr/venue/3720",
				// 337. 티랩 판교 원마을점(3:1 그룸 필라테스룸)
				"https://shareit.kr/venue/3246",
				// 338. 블레스짐(부천/중동 1:1피티샵)
				"https://shareit.kr/venue/3039",
				// 339. 케이케이엠 축구교실(파주/풋살 실내풋살장B)
				"https://shareit.kr/venue/1856",
				// 340. 맥스체대입시 광진교육원(광진/헬스 실내체육관)
				"https://shareit.kr/venue/1815",
				// 341. H풋볼클럽(고양/일산 시설전체대관)
				"https://shareit.kr/venue/1758",
				// 342. 국제대학교(창조관 무도실)
				"https://shareit.kr/venue/1126",
				// 343. 안양배드민턴장(역세권 100평규모 층고높은 체육관)
				"https://shareit.kr/venue/12930",
				// 344. 디오스포츠(디오스포츠)
				"https://shareit.kr/venue/12910",
				// 345. 메라키골프 용인점(메라키골프)
				"https://shareit.kr/venue/12755",
				// 346. 스윙앤밸런스 스튜디오 논현점(강남 논현동 셀프 필라테스 렌탈 스튜디오)
				"https://shareit.kr/venue/12000",
				// 347. TPZ 더프라자 스튜디오 한남점(핑크핑크한 707호)
				"https://shareit.kr/venue/11378",
				// 348. 온스바디 위례점(온스바디)
				"https://shareit.kr/venue/11365",
				// 349. 민턴랩배드민턴아카데미(민턴랩 배드민턴 아카데미)
				"https://shareit.kr/venue/9049",
				// 350. jw필라테스(그룹 레슨룸(리포머))
				"https://shareit.kr/venue/8649",
				// 351. 맥스체대입시 대전교육원(헬스/요가/필라테스)
				"https://shareit.kr/venue/8322",
				// 352. 세종스포츠센터 2호점(실내체육관)
				"https://shareit.kr/venue/8113",
				// 353. 파랑새 유소년 스포츠 클럽 송촌점(대전/농구 실내체육관)
				"https://shareit.kr/venue/8104",
				// 354. 월드짐농구교실(대전점)(대전/농구 실내체육관)
				"https://shareit.kr/venue/8039",
				// 355. 마인드온바디 클리닉(실내운동공간)
				"https://shareit.kr/venue/7792",
				// 356. jw필라테스(개인 레슨룸)
				"https://shareit.kr/venue/7423",
				// 357. 컬쳐연구소(필라테스 1:1 단독 룸)
				"https://shareit.kr/venue/6826",
				// 358. 타잔101클라이밍 수원망포점(수원 실내암벽)
				"https://shareit.kr/venue/6017",
				// 359. 휘트니스&복싱(153휘트니스&복싱짐)
				"https://shareit.kr/venue/3614",
				// 360. 티랩 판교 원마을점(1:1 필라테스룸)
				"https://shareit.kr/venue/3245",
				// 361. 맥스체대입시 춘천교육원(춘천/생활체육 스포츠)
				"https://shareit.kr/venue/2678",
				// 362. 맥스체대입시 강릉교육원(강릉/생활체육 스포츠)
				"https://shareit.kr/venue/1949",
				// 363. 맥스체대입시 구리교육원(구리/생활체육 스포츠)
				"https://shareit.kr/venue/1748",
				// 364. 부천스포츠(실내 대체육관)
				"https://shareit.kr/venue/12969",
				// 365. 락스포츠타운(인천서구/청라/검단 농구)
				"https://shareit.kr/venue/12963",
				// 366. 에스원농구스포츠클럽(에스원농구스포츠클럽)
				"https://shareit.kr/venue/12789",
				// 367. 하울링 세계무술(실내체육관/무술수련관)
				"https://shareit.kr/venue/12412",
				// 368. 제이투베이스볼(제이투베이스볼)
				"https://shareit.kr/venue/12407",
				// 369. 굿데이짐(소규모 PT SHOP, STUDIO)
				"https://shareit.kr/venue/12138",
				// 370. 베리타스 체대입시(분당 실내 체육관/연습실)
				"https://shareit.kr/venue/12075",
				// 371. 마인필라테스앤폴(나만의 필라테스룸, 폴룸)
				"https://shareit.kr/venue/12064",
				// 372. 스포니스 군자점(스포니스 군자점)
				"https://shareit.kr/venue/11642",
				// 373. (주)반포중앙스포츠 서초점([서초/테니스]실내 스크린 테니스)
				"https://shareit.kr/venue/11600",
				// 374. TPZ 더프라자 스튜디오 한남점(자연속에 있는 느낌 606호)
				"https://shareit.kr/venue/11377",
				// 375. TPZ 더프라자 스튜디오 한남점(듀엣 수업 가능한 넓은 공간 505호)
				"https://shareit.kr/venue/11376",
				// 376. TPZ 더프라자 스튜디오 한남점(채광 좋은 404호)
				"https://shareit.kr/venue/11375",
				// 377. 사당 하이필라테스(사당 하이필라테스)
				"https://shareit.kr/venue/11338",
				// 378. 해운대 벨라임 PT 스튜디오(해운대 벨라임 PT 스튜디오)
				"https://shareit.kr/venue/10986",
				// 379. 식스컷츠피트니스 안성공도점(헬스장/웰니스센터)
				"https://shareit.kr/venue/10547",
				// 380. 파랑새 유소년 스포츠 클럽([대전/민턴]코트E)
				"https://shareit.kr/venue/9151",
				// 381. 파랑새 유소년 스포츠 클럽([대전/민턴]코트D)
				"https://shareit.kr/venue/9150",
				// 382. 파랑새 유소년 스포츠 클럽([대전/민턴]코트C)
				"https://shareit.kr/venue/9149",
				// 383. 파랑새 유소년 스포츠 클럽([대전/민턴]코트B)
				"https://shareit.kr/venue/9148",
				// 384. 파랑새 유소년 스포츠 클럽([대전/민턴]코트A)
				"https://shareit.kr/venue/9147",
				// 385. 아이엠휘트니스&필라테스(필라테스관)
				"https://shareit.kr/venue/9057",
				// 386. jw필라테스 그룹레슨룸(체어&슈로즈)
				"https://shareit.kr/venue/8650",
		//387.파랑새유소년스포츠클럽 [대전/민턴]코트F
				"https://shareit.kr/venue/8098",
		//388.파랑새스포츠센터 [대전/민턴]실내체육관
				"https://shareit.kr/venue/8096",
		//389.골프존조이마루 복합동 챔피언스홀
				"https://shareit.kr/venue/7924",
		//390.골프존조이마루 복합동 골프존(2F)
				"https://shareit.kr/venue/7906",
		//391.골프존조이마루 복합동 골프존(3F)
				"https://shareit.kr/venue/7900",
		//392.창원봉암스포츠센터 [배드민턴]B동4코트
				"https://shareit.kr/venue/6616",
		//393.창원봉암스포츠센터 [배드민턴]B동3코트
				"https://shareit.kr/venue/6615",
		//394.창원봉암스포츠센터 [배드민턴]B동2코트
				"https://shareit.kr/venue/6614",
		//395.창원봉암스포츠센터 [배드민턴]B동2코트
				"https://shareit.kr/venue/6613",
		//396.창원봉암스포츠센터 [배드민턴]A동4코트
				"https://shareit.kr/venue/6612",
		//397.창원봉암스포츠센터 [배드민턴]A동3코트
				"https://shareit.kr/venue/6611",
		//398.창원봉암스포츠센터 [배드민턴]A동2코트
				"https://shareit.kr/venue/6610",
		//399.창원봉암스포츠센터 [배드민턴]A동1코트
				"https://shareit.kr/venue/6593",
		//400.맥스체대입시광주교육원 맥스스포츠 광주점
				"https://shareit.kr/venue/5864",
		//401.바디챌린지휘트니스 [의정부/헬스]PT
				"https://shareit.kr/venue/4579",
		//402.바디챌린지MTP트레이닝 1호점 [의정부/헬스]PT
				"https://shareit.kr/venue/4577",
		//403.서울신학대학교 100주년기념관 실내 탁구장
				"https://shareit.kr/venue/4360",
		//404.하랑스포츠아카데미 [남양주/댄스]실내체육관
				"https://shareit.kr/venue/3727",
		//405.티랩 판교 원마을점 1:1 PT룸
				"https://shareit.kr/venue/3677",
		//406.맥스체대입시 논산교육원 [논산/생활체육]스포츠
				"https://shareit.kr/venue/2626",
		//407.플레이비 야구 아카데미 [송파/야구]실내체육관
				"https://shareit.kr/venue/2165",
		//408.여의도골프아카데미 [여의도/골프]실내연습장1
				"https://shareit.kr/venue/2132",
		//409.여의도골프아카데미 [여의도/골프]실내연습장2
				"https://shareit.kr/venue/2131",
		//410.여의도골프아카데미 [여의도/골프]실내연습장3
				"https://shareit.kr/venue/2130",
		//411.경동대학교 양주캠퍼스 충효관(양주) 탁구장
				"https://shareit.kr/venue/1085",
		//412.경희대학교(국제) 체육대학관 탁구장
				"https://shareit.kr/venue/728",
		//413.스튜디오 M 스튜디오 M
				"https://shareit.kr/venue/6321",
		//414.(주)골든블루마리나 [한강/요트]신데렐라
				"https://shareit.kr/venue/3648",
		//415.폴로그 자연광 렌탈스튜디오
				"https://shareit.kr/venue/6790",
		//416.월드레포츠클럽 [서초/방배]실외풋살장
				"https://shareit.kr/venue/4334",
		//417.(주)골든블루마리나 [한강/요트]리무진
				"https://shareit.kr/venue/3647",
		//418.경희대학교(국제) 체육대학관 배구장
				"https://shareit.kr/venue/736",
		//419.와인앤스크린 와인앤스크린[스크린골프]
				"https://shareit.kr/venue/6620",
		//420.유캔스튜디오 유캔스튜디오
				"https://shareit.kr/venue/6479",
		//421.YN컴퍼니 댄스연습실
				"https://shareit.kr/venue/1669",
		//422.아트스페이스 인-서초 아트스페이스 인-연습실
				"https://shareit.kr/venue/6986",
		//423.[오.픈.할.인] 개구리 연습실 단독 연습실
				"https://shareit.kr/venue/7762",
		//424.라라홀(딴따라댄스홀) 대형 댄스 파티 촬영
				"https://shareit.kr/venue/9249",
		//425.분당 성남 프리업댄스 스튜디오 분당 성남 댄스연습실
				"https://shareit.kr/venue/6342",
		//426.오운스테이지 Dance Room
				"https://shareit.kr/venue/5848",
		//427.라운지 오브 디온 메인홀
				"https://shareit.kr/venue/2232",
		//428.옥희와인 파티플레이스 메인홀
				"https://shareit.kr/venue/1996",
		//429.고올인 풋살장 [인천/축구]야외풋살장
				"https://shareit.kr/venue/3960",
		//430.(주)골든블루마리나 [한강/요트]프린세스
				"https://shareit.kr/venue/3645",
		//431.서울여자대학교 제2과학관 체조무용실
				"https://shareit.kr/venue/1302",
		//432.올드스쿨 연습실 신촌 올드스쿨 연습실
				"https://shareit.kr/venue/11042",
		//433.스칸디빌리지(파티룸,놀이방) [중랑/놀이방]키즈파티룸
				"https://shareit.kr/venue/3998",
		//434.런앤짐 풋살/농구장 [남양주/축구]야외풋살장
				"https://shareit.kr/venue/3819",
		//435.경희대학교(서울) 푸른솔문화관 무용실습실
				"https://shareit.kr/venue/805",
		//436.르엔발레스튜디오 르엔발레스튜디오
				"https://shareit.kr/venue/11621",
		//437.스웨이댄스 송파석촌호수점 A+B홀 통대관
				"https://shareit.kr/venue/5885",
		//438.대한체육교육원 [동탄/축구]실외풋살장
				"https://shareit.kr/venue/3630",
		//439.(주)골든블루마리나 [한강/요트]러셀러
				"https://shareit.kr/venue/3403",
		//440.헤븐F.C [파주/축구]야외풋살장
				"https://shareit.kr/venue/3763",
		//441.방배동 빅애플 빅애플천안
				"https://shareit.kr/venue/9916",
		//442.아트스페이스 인-서초 파티룸/세미나/회의실
				"https://shareit.kr/venue/6987",
		//443.파워유소년스포츠 [남양주/축구]실외풋살장
				"https://shareit.kr/venue/3855",
		//444.파라댄스 파라댄스스튜디오
				"https://shareit.kr/venue/4156",
		//445.(주)골든블루마리나 [한강/요트]씨레이
				"https://shareit.kr/venue/3646",
		//446.경동대학교 양주캠퍼스 충효관(양주) 학생식당
				"https://shareit.kr/venue/1087",
		//447.스튜디오590 스튜디오590
				"https://shareit.kr/venue/12326",
		//448.AHYIEL AHYIEL_스튜디오
				"https://shareit.kr/venue/8309",
		//449.스웨이댄스 송파석촌호수점 스웨이댄스 B홀
				"https://shareit.kr/venue/6899",
		//450.스웨이댄스 송파석촌호수점 스웨이댄스 A홀
				"https://shareit.kr/venue/6898",
		//451.경희대학교(국제) 체육대학관 에어로빅실
				"https://shareit.kr/venue/729",
		//452.웨이브파크 [다이빙존] 블루 홀 라군
				"https://shareit.kr/venue/12737",
		//453.신라스테이 구로 피트니스 센터
				"https://shareit.kr/venue/10189",
		//454.에이원민턴 잠실새내점 실내배드민턴 센터
				"https://shareit.kr/venue/12976",
		//455.하울링 세계무술 세미나 신청
				"https://shareit.kr/venue/12432",
		//456.파랑새스포츠센터 [대전/댄스]실내연습실
				"https://shareit.kr/venue/8097",
		//457.골프존조이마루 스포츠/문화예술 전체대관
				"https://shareit.kr/venue/6775"
	 

	     
	};
		
		int num = 1;
		
		for(int i=0; i<urlList.length; i++) {
			
			
			String url = urlList[i];
			
			System.out.println(url);
			
			Document doc =Jsoup.connect(url).get();
			
			Elements d1 = doc.getElementsByAttributeValue("id","__NEXT_DATA__");
			
			
			String str = d1.dataNodes().get(0).getWholeData().replaceAll("__N_SSG", "nssg");
			
			
			
			ObjectMapper objectMapper = new ObjectMapper();
		
			objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			// field 일치하지않는거 무시하겠다는 내용 // 주의 : 원하는 데이턱 안들어갈수있음
 			
			
			JSONPaser2DTO JsonDate 
			= objectMapper.readValue(str, JSONPaser2DTO.class);
			
			
			List<Photo> photos = JsonDate.getProps().getPageProps().getSpace().getPhotos();
			
		
			
			for(int j=0; j<photos.size(); j++) {
				//filepath
				String filepath =JsonDate.getProps().getPageProps().getSpace().getPhotos().get(j).getFile().getResourcePath();
				
				//filename
				String filename = JsonDate.getProps().getPageProps().getSpace().getHost().getName();
				
				
				System.out.println(filepath);
				
				System.out.println(filename);
				
				ImagesDTO imagesDTO = new ImagesDTO(num, filepath, filename);
				
				System.out.println("DTO 저장완료");
				
				
				
				service.main_sub_banner(imagesDTO);
				
				System.out.println(i + "저장완료");
			}
			 
			num++;
			
			
		}
		
		
		
		
		
		
	}
	
	
	
	
	
	
}
