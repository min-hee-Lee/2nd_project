package com.example.shop.test.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.shop.test.BusObDTO;
import com.example.shop.test.BusRouteDTO;
import com.example.shop.test.FinalDTO;
import com.example.shop.test.KingDTO;

import com.example.shop.test.RouteDTO;
import com.example.shop.test.RouteListDTO;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.cfg.CoercionConfig;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@CrossOrigin("*")
@RestController
public class BusController {
	
	
	@GetMapping("/map/busList")
	public Map<String, Object> busExecute(
			@RequestParam("latitude") String latitude,
			@RequestParam("longitude") String longitude
			) throws IOException{
		
		
		
		Map<String, Object> map = new HashMap<>();
		
		
		StringBuilder urlBuilder = new StringBuilder("http://ws.bus.go.kr/api/rest/stationinfo/getStationByPos"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + 
        		"=JOj477Pjm59a1ozBHNYRG58lyxtNeju8B31Pr3BkDoug4EANQsWN60Vu%2BsieUZdvJ59oh%2Bxsm0on5zfJEHdejQ%3D%3D"); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("tmX","UTF-8") + "=" + URLEncoder.encode(longitude, "UTF-8")); /*기준위치 X*/
        urlBuilder.append("&" + URLEncoder.encode("tmY","UTF-8") + "=" + URLEncoder.encode(latitude, "UTF-8")); /*기준위치 Y*/
        urlBuilder.append("&" + URLEncoder.encode("radius","UTF-8") + "=" + URLEncoder.encode("800", "UTF-8")); /*단위 m(미터)*/
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
        	System.out.println("200 성공적으로 완료");
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
        
       
        System.out.println("sb : " + sb.toString());
  
        
        
        XmlMapper xmlMapper = new XmlMapper();
       
        Map<String, Object> xmlMap = xmlMapper.readValue(sb.toString(), new TypeReference<Map<String, Object>>() {});
       
        System.out.println("xmlMap : "+xmlMap);
        
        //jsonMap.get("")
        
        
        
        
       
        ObjectMapper mapper = new ObjectMapper();
     
        
     
        
        String jsonStr = mapper.writeValueAsString(xmlMap);
        
        System.out.println("jsonStr : 메퍼에 서 스트링으로 바꿨음"+jsonStr);
        
        KingDTO dto = null;
        
        
        try {
        	dto =  mapper.readValue(jsonStr, KingDTO.class);
        	System.out.println("jsonStr 정상흐름");
        	
		} catch (Exception e) {
			
			System.out.println(e.getMessage());
			
			System.out.println("null 이면 발옹됌(jsonStr) ");
			return map;
		}
        	
       
        
        //KingDTO dto = mapper.readValue(jsonStr, KingDTO.class);
        
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
        
        if(dto==null) {
        	return map;
        }
        
        List<BusObDTO> BusList =dto.getMsgBody().getItemList();
        
     /////////////////////////////////////////////////////////////////////////   
        
        //map 리턴 할꺼임 
       
        List<FinalDTO> finalList = new ArrayList<>();
        //List<Object> finalList = new ArrayList<Object>();
        
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
     	      Map<String, Object> newXmlMap =null;
     	      
     	      
     	       try {
     	    	   System.out.println("XmpMapper : 정상흐름 ");
     	    	  newXmlMap = newXmlMapper.readValue(newSb.toString(), new TypeReference<Map<String, Object>>() {});
        	       
			} catch (Exception e) {
				System.out.println("XmpMapper : 에러 흐름 ");
				return map;
			} 
     	        
     	         System.out.println("newXmlMap : " + newXmlMap);
     	        
     	        ObjectMapper newMapper = new ObjectMapper();
     	        
     	       
     	        
     	        String newJsonStr = newMapper.writeValueAsString(newXmlMap);
     	        	
     	        System.out.println(newJsonStr);
     	      
     	       
     	       JsonNode jsonNode =  newMapper.readTree(newJsonStr);
     	       
     	       System.out.println("jsonNode : " + jsonNode);
     	        
     	       List<RouteDTO> itemList = new ArrayList<>();
     	       
     	       JsonNode itemListNode = jsonNode.get("msgBody").get("itemList");
     	       
     	       System.out.println("jsonNode msgBody "+jsonNode.get("msgBody"));
     	      System.out.println("jsonNode itemList "+jsonNode.get("msgBody").get("itemList"));
     	       
     	      //itemListNode.
     	      
     	       if(itemListNode == null)
     	    	   return map;
     	    	   
     	       if(itemListNode.isArray()) {
     	    	   for(JsonNode node : itemListNode) {
     	    		  RouteDTO routeDTO = mapper.convertValue(node, RouteDTO.class);
     	    		  System.out.println("routeDTO : "+routeDTO);
     	    	      itemList.add(routeDTO);
     	    	   }
     	       }else {
     	    	  RouteDTO routeDTO = mapper.convertValue(itemListNode, RouteDTO.class);
     	    	  itemList.add(routeDTO);
     	       }
     	       
     	      RouteListDTO newDto = new RouteListDTO();
     	     newDto.setItemList(itemList);
     	       newDto.setItemList(itemList);
     	       
     	       
//     	    
 	        		 
     	        System.out.println("newDto : "+newDto);
     	        
     	        if(newDto==null) {
     	        	return map;
     	        }
     	        
     	       List<RouteDTO>  mapBusList =  newDto.getItemList();
     	      // List<RouteDTO>  mapBusList = null;
     	       
     	       if(mapBusList ==null) {
     	    	   return map;
     	       }
     	  	
	      		if(mapBusList.size()-1<i) {
	      			break;
	      		}
	      		
     	       
     	       FinalDTO finalDTO = new FinalDTO();
     	       
     	      finalDTO.setArsId(BusList.get(i).getArsId());
	      		finalDTO.setDist(BusList.get(i).getDist());
	      		finalDTO.setStationNm(BusList.get(i).getStationNm());
	      		finalDTO.setTerm(mapBusList.get(i).getTerm());
	      		finalDTO.setFirstBusTm(mapBusList.get(i).getFirstBusTm());
	      		finalDTO.setLastBusTm(mapBusList.get(i).getLastBusTm());
	      		finalDTO.setBusRouteId(mapBusList.get(i).getBusRouteId());
	      		finalDTO.setBusRouteNm(mapBusList.get(i).getBusRouteNm());
	      		finalDTO.setStBegin(mapBusList.get(i).getStBegin());
	      		finalDTO.setStEnd(mapBusList.get(i).getStEnd());
	      	
	      		
     	       
	      		System.out.println("finalDTO : " + finalDTO);
	      		
//     	       List<RouteDTO> RouteList = null;
//	     	      Map<String, RouteDTO> RouteMap = null;
//	     	     FinalDTO finalDTO = new FinalDTO();
//	     	  	if (newDto.getMsgBody().getItemList() instanceof List) {
//	     	  		RouteList = (List<RouteDTO>) newDto.getMsgBody().getItemList();
//	     	  		
//	     	  		if(RouteList !=null) {
//	     	  			finalDTO.setArsId(BusList.get(i).getArsId());
//		        		finalDTO.setDist(BusList.get(i).getDist());
//		        		finalDTO.setStationNm(BusList.get(i).getStationNm());
//		        		finalDTO.setTerm(RouteList.get(i).getTerm());
//		        		finalDTO.setFirstBusTm(RouteList.get(i).getFirstBusTm());
//		        		finalDTO.setLastBusTm(RouteList.get(i).getLastBusTm());
//		        		finalDTO.setBusRouteId(RouteList.get(i).getBusRouteId());
//		        		finalDTO.setBusRouteNm(RouteList.get(i).getBusRouteNm());
//		        		finalDTO.setStBegin(RouteList.get(i).getStBegin());
//		        		finalDTO.setStEnd(RouteList.get(i).getStEnd());
//	     	  		}
//	        		
//	        		
//	     		    // List 처리
//	        		
//	     		} else if (newDto.getMsgBody().getItemList() instanceof Map) {
//	     		    RouteMap = (Map<String, RouteDTO>) newDto.getMsgBody().getItemList();
//	     		    // Map 처리
//	     		    
//	     		    
//	        		
//	        		finalDTO.setArsId(BusList.get(i).getArsId());
//	        		finalDTO.setDist(BusList.get(i).getDist());
//	        		finalDTO.setStationNm(BusList.get(i).getStationNm());
//	        		finalDTO.setMap(RouteMap);
//	     		}
//  	        
  	       
     		
     		finalList.add(finalDTO);
        		
        		if(i==2) {
	        		
	        		break;
	        	}
        		
        	}
        	
        	
        	map.put("mapBusList", finalList);
        	
        }
        
        
		
		
		
		return map;
	}
	
	
}
