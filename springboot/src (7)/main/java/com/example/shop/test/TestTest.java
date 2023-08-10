package com.example.shop.test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

public class TestTest {
	 public static void main(String[] args) throws IOException {
	        StringBuilder urlBuilder = new StringBuilder("http://ws.bus.go.kr/api/rest/stationinfo/getStationByPos"); /*URL*/
	        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + 
	        		"=JOj477Pjm59a1ozBHNYRG58lyxtNeju8B31Pr3BkDoug4EANQsWN60Vu%2BsieUZdvJ59oh%2Bxsm0on5zfJEHdejQ%3D%3D"); /*Service Key*/
	        urlBuilder.append("&" + URLEncoder.encode("tmX","UTF-8") + "=" + URLEncoder.encode("126.995852", "UTF-8")); /*기준위치 X*/
	        urlBuilder.append("&" + URLEncoder.encode("tmY","UTF-8") + "=" + URLEncoder.encode("37.483637", "UTF-8")); /*기준위치 Y*/
	        urlBuilder.append("&" + URLEncoder.encode("radius","UTF-8") + "=" + URLEncoder.encode("100", "UTF-8")); /*단위 m(미터)*/
	        URL url = new URL(urlBuilder.toString());
	        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	        conn.setRequestMethod("GET");
	        conn.setRequestProperty("Content-type", "application/json");
	        System.out.println("Response code: " + conn.getResponseCode());
	        BufferedReader rd;
	        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
	            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	        } else {
	            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
	        }
	        StringBuilder sb = new StringBuilder();
	        String line;
	        while ((line = rd.readLine()) != null) {
	            sb.append(line);
	        }
	        rd.close();
	        conn.disconnect();
	        System.out.println(sb.toString());
	        
	        XmlMapper xmlMapper = new XmlMapper();
	        Map<String, Object> xmlMap = xmlMapper.readValue(sb.toString(), new TypeReference<Map<String, Object>>() {});
	        System.out.println(xmlMap);
	        
	        //jsonMap.get("")
	        
	        
	        
	        
	        
	        ObjectMapper mapper = new ObjectMapper();
	        
	        String jsonStr = mapper.writeValueAsString(xmlMap);
	        KingDTO dto = mapper.readValue(jsonStr, KingDTO.class);
	        
	        System.out.println(dto);
	        
	        // 정류소 고유 번호  arsId =
	        // 정류소 좌표X (GRS80) posX =
	        //정류소 좌표Y (GRS80) posY = 
	        //거리 dist = 
	        //정류소 좌표X (WGS84)	gpsX			정류소 좌표X (WGS84)
	        //정류소 좌표Y (WGS84)	gpsY
	        //정류소타입	stationTp
	        //정류소명	stationNm
	        //정류소 ID	stationId
	        
	        
	        
	        List<BusObDTO> BusList =dto.getMsgBody().getItemList();
	        
	     /////////////////////////////////////////////////////////////////////////   
	        
	        //map 리턴 할꺼임 
	       
	        //List<FinalDTO> finalList = new ArrayList<>();
	        
	        List<Object> finalList = new ArrayList<>();
	        
	        if(BusList !=null) {
	        	
	        	for(int i=0; i < BusList.size(); i++) {
	        		
	        		
	        		
	        		
	        		 StringBuilder newUrlBuilder = new StringBuilder("http://ws.bus.go.kr/api/rest/stationinfo/getRouteByStation"); /*URL*/
	     	        newUrlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + 
	     	        		"=JOj477Pjm59a1ozBHNYRG58lyxtNeju8B31Pr3BkDoug4EANQsWN60Vu%2BsieUZdvJ59oh%2Bxsm0on5zfJEHdejQ%3D%3D"); /*Service Key*/
	     	        newUrlBuilder.append("&" + URLEncoder.encode("arsId","UTF-8") + "=" + URLEncoder.encode(String.valueOf(BusList.get(i).getArsId()), "UTF-8")); /*기준위치 X*/
	     	        URL newUrl = new URL(newUrlBuilder.toString());
	     	        HttpURLConnection newConn = (HttpURLConnection) newUrl.openConnection();
	     	        newConn.setRequestMethod("GET");
	     	        newConn.setRequestProperty("Content-type", "application/json");
	     	        System.out.println("Response code: " + newConn.getResponseCode());
	     	        BufferedReader newRd;
	     	        if(newConn.getResponseCode() >= 200 && newConn.getResponseCode() <= 300) {
	     	        	newRd = new BufferedReader(new InputStreamReader(newConn.getInputStream()));
	     	        } else {
	     	        	newRd = new BufferedReader(new InputStreamReader(newConn.getErrorStream()));
	     	        }
	     	        StringBuilder newSb = new StringBuilder();
	     	        String newLine;
	     	        while ((newLine = newRd.readLine()) != null) {
	     	        	newSb.append(newLine);
	     	        }
	     	        newRd.close();
	     	        newConn.disconnect();
	     	        System.out.println(newSb.toString());
	     	        
	     	        XmlMapper newXmlMapper = new XmlMapper();
	     	        Map<String, Object> newXmlMap = newXmlMapper.readValue(newSb.toString(), new TypeReference<Map<String, Object>>() {});
	     	        System.out.println(newXmlMap);
	     	        
	     	        ObjectMapper newMapper = new ObjectMapper();
	     	        
	     	        String newJsonStr = newMapper.writeValueAsString(newXmlMap);
	     	        BusRouteDTO newDto = newMapper.readValue(newJsonStr, BusRouteDTO.class);
	     	        
	     	        System.out.println(newDto);
	     	        
	     	      Object  mapBusList =  newDto.getMsgBody().getItemList();
	     	      
	     	      System.out.println(mapBusList);
	     	        
//	     	       List<RouteDTO> RouteList = null;
//		     	      Map<String, RouteDTO> RouteMap = null;
//		     	     FinalDTO finalDTO = new FinalDTO();
//		     	  	if (newDto.getMsgBody().getItemList() instanceof List) {
//		     	  		RouteList = (List<RouteDTO>) newDto.getMsgBody().getItemList();
//		     	  		
//		     	  		
//		        		
//		        		finalDTO.setArsId(BusList.get(i).getArsId());
//		        		finalDTO.setDist(BusList.get(i).getDist());
//		        		finalDTO.setStationNm(BusList.get(i).getStationNm());
//		        		finalDTO.setLinkHashmap(RouteList);
//		        		finalDTO.setTerm(RouteList.get(i).getTerm());
//		        		finalDTO.setFirstBusTm(RouteList.get(i).getFirstBusTm());
//		        		finalDTO.setLastBusTm(RouteList.get(i).getLastBusTm());
//		        		finalDTO.setBusRouteId(RouteList.get(i).getBusRouteId());
//		        		finalDTO.setBusRouteNm(RouteList.get(i).getBusRouteNm());
//		        		finalDTO.setStBegin(RouteList.get(i).getStBegin());
//		        		finalDTO.setStEnd(RouteList.get(i).getStEnd());
//		     		     List 처리
//		        		
//		     		} else if (newDto.getMsgBody().getItemList() instanceof Map) {
//		     		    RouteMap = (Map<String, RouteDTO>) newDto.getMsgBody().getItemList();
//		     		    // Map 처리
//		     		    
//		        		
//		        		finalDTO.setArsId(BusList.get(i).getArsId());
//		        		finalDTO.setDist(BusList.get(i).getDist());
//		        		finalDTO.setStationNm(BusList.get(i).getStationNm());
//		        		finalDTO.setTerm(RouteList.get(i).getTerm());
//		        		finalDTO.setFirstBusTm(RouteList.get(i).getFirstBusTm());
//		        		finalDTO.setLastBusTm(RouteList.get(i).getLastBusTm());
//		        		finalDTO.setBusRouteId(RouteList.get(i).getBusRouteId());
//		        		finalDTO.setBusRouteNm(RouteList.get(i).getBusRouteNm());
//		        		finalDTO.setStBegin(RouteList.get(i).getStBegin());
//		        		finalDTO.setStEnd(RouteList.get(i).getStEnd());
//		     		}
	     	        
	     	       
	        		
	        		finalList.add(mapBusList);
	        		
	        		if(i==2) {
		        		
		        		break;
		        	}
	        		
	        	}
	        	
	        	
	        	
	        }
	        
	       ///////////////////////////////////////////////////////////////////////// 
	       // BusList.get(0).getArsId();
	        
	        
	        
	        
	       
	        
	        //jsonMap.get("")
	        
	        
	//{comMsgHeader=, msgHeader={headerCd=0, headerMsg=정상적으로 처리되었습니다., itemCount=0}, 
	//msgBody={itemList=[{busRouteAbrv=142, busRouteId=100100021, busRouteNm=142, busRouteType=3, firstBusTm=20150717040000, firstBusTmLow=20200114000000, lastBusTm=20150717224500, lastBusTmLow=20150717224500, length=59.4, nextBus=10, stBegin=도봉산, stEnd=방배동, term=9}
	//, {busRouteAbrv=406, busRouteId=100100064, busRouteNm=406, busRouteType=3, firstBusTm=20150717042000, firstBusTmLow=20151125045000, lastBusTm=20150717232000, lastBusTmLow=20150717224400, length=42.59, nextBus=10, stBegin=개포동, stEnd=서울역, term=13}, 
	//{busRouteAbrv=4319, busRouteId=100100427, busRouteNm=4319, busRouteType=4, firstBusTm=20150717043000, firstBusTmLow=20151125043000, lastBusTm=20150717230000, lastBusTmLow=20150717220000, length=33.3, nextBus=10, stBegin=전원마을, stEnd=잠실역, term=15}]}}        
	        
	        
	        
	        
	        return;
	    }
}
