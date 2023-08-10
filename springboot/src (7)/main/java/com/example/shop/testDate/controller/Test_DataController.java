package com.example.shop.testDate.controller;

import java.io.ByteArrayOutputStream;
import java.io.Console;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.print.attribute.standard.Media;
import javax.servlet.http.HttpServletRequest;


import org.apache.ibatis.reflection.ArrayUtil;
import org.apache.ibatis.type.BigIntegerTypeHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.shop.testDate.dto.DistanceDTO;
import com.example.shop.testDate.dto.Main_CodeDTO;
import com.example.shop.testDate.dto.Main_ConDTO;
import com.example.shop.testDate.dto.Page_MapDTO;
import com.example.shop.testDate.dto.Page_TestDTO;
import com.example.shop.testDate.dto.ReviewDTO;
import com.example.shop.testDate.dto.main_imagesDTO;
import com.example.shop.testDate.service.TestDataService;

@CrossOrigin("*")
@RestController
public class Test_DataController {
	
	@Autowired
	private TestDataService service;
	
	
	public Test_DataController() {
	
	}
	
	@GetMapping("/board/list/test/{currentPage}")
	public Map<String, Object> mainList(
			@PathVariable("currentPage") int currentPage,
			@RequestParam("filename") String filename){
		
	
		
		Map<String, Object> map = new HashMap<>();
		
		int totalRecord =1;
		
		if(filename != null && !filename.isEmpty()) {
			totalRecord=service.count(filename);
			
		} else {
			totalRecord=service.count(filename);
		}
				
		if(totalRecord >=1) {
		
			
			Page_TestDTO pdto = new Page_TestDTO(currentPage, totalRecord);
			
			if(filename != null && !filename.isEmpty()) {
				pdto.setFilename(filename);
				map.put("aList", service.main_list(pdto));
				
			} else {
				pdto.setFilename(filename);
				map.put("aList", service.main_list(pdto));
			}
			
			
			
			
			//System.out.println(service.main_list(pdto));
			
			
			map.put("pv", pdto);
			
		}
		
		
		return map;
	}
	             
	@GetMapping("/board/list/detail")
	public Map<String, Object> mainListDetail(@RequestParam("main_code") String main_code){
		
		
		//System.out.println("mainListDetail 컨트롤러 호출 @@");
		
		Map<String, Object> map = new HashMap<>();
		
		
		
		map.put("aList", service.main_list_detail(Integer.parseInt(main_code)));
		
		
		
		
		return map;
	}
	
	@GetMapping("/board/review/{currentPage}")
	public Map<String, Object> ReviewSelect(
			@PathVariable("currentPage") int currentPage,
			@RequestParam("main_code") String main_code){
		
	
		
		Map<String, Object> map = new HashMap<>();
		
		
		
		int totalRecord = service.reviewCount(Integer.parseInt(main_code));
		
		//System.out.println("Review : "+totalRecord);
		
		if(totalRecord >=1) {
		
			
			Page_TestDTO pdto = new Page_TestDTO(currentPage, totalRecord,Integer.parseInt(main_code));
			
			List<ReviewDTO> testList = service.ReviewSelect(pdto);
			
			System.out.println("리스트 확인 : " + testList);
			
			for(int i=0; i<testList.size(); i++) {
				
				//System.out.println("리스트 확인 : " + testList);
				
				//System.out.println("이미지 확인 : " + testList.get(i).getImagesDTO().get(i).getFilepath());				
			}
			
			map.put("ReviewList", service.ReviewSelect(pdto));
			
			//System.out.println(service.ReviewSelect(pdto));
			//System.out.println(pdto);
			
			//System.out.println(service.main_list(pdto));
			
			
			map.put("pvReview", pdto);
			
		}
		
		return map;
	}
	
	@PostMapping("/board/review")
	public int reviewInsert(ReviewDTO reviewDTO,List<MultipartFile> files) {
		//PageDTO pv
		//System.out.println(reviewDTO);
		
		
		System.out.println("board/review컨트롤러 호출");
		System.out.println("reivewDTO : " + reviewDTO);
		
		
		
		main_imagesDTO imagesDTO = new main_imagesDTO();
		
		
		
		service.reviewInsert(reviewDTO,imagesDTO);
		if(files ==null) {
			service.insertReviewImage(imagesDTO);
			
		}
		
		
		System.out.println("리뷰 인썰트 컨트롤러 호출");
		
		//업로드할 위치 // 현재 날짜 값 폴더
		 if(files!=null) {
			 
			
		 
				String upload_path = "D:/k_digital/fileupload";
				//업로드할 위치 // 현재 날짜 값 폴더
				//DB에 저장하여 사용
				try {
					//System.out.println("files : " + files.get(0).getOriginalFilename());
					
					for(int i=0; i<files.size(); i++) {
						
						 System.out.println("i 번째"+files.get(i));
						 
						 
						String originName = files.get(i).getOriginalFilename(); //파일.png??
						
						//System.out.println(originName);
						
						
						String[] tempStr = originName.split("\\."); //파일 구분하려면 \\.
						//System.out.println("tempStr 리스트호출 완료");
						
						//System.out.println("tempStr : " + tempStr[0]);
						
						originName = tempStr[0];
						String type = tempStr[1];
						
						String newfilaName = UUID.randomUUID().toString();
						
						File newFile = new File(upload_path, newfilaName+"."+ type);
						
						if(!newFile.exists()) {//폴더가 없을 경우 폴더 만들기
							newFile.mkdir();
						}
						
						files.get(i).transferTo(newFile);
						
						main_imagesDTO images = new main_imagesDTO();
						
						images.setReview_code(imagesDTO.getReview_code());
						images.setFilename(originName);
						images.setType(type);
						images.setFilepath(upload_path+"/" + newfilaName+'.'+type);
						
						System.out.println("images 체크"+images);
						
						service.insertReviewImage(images);
						
					}// transferTo(File file) > multipartFile을 주어진 file의 경로로 이동 (copy)
				
					} catch(IOException e) {
					System.out.println(e.getMessage());
					
				}
				
		 }
		
		
		
		
		
		
		return 1;
	}
	
	@GetMapping("/board/review/selectOne/{review_code}")
	public Map<String, Object> reviewOneSelect(@PathVariable("review_code") int review_code) {
		
		//System.out.println("reviewOneSELECT 컨트롤러 호출");
		
		
		
		Map<String, Object> map = new HashMap<>();
		
		
		map.put("ReviewOne", service.reviewOneSelect(review_code));
		
		
		
		return map;
		
	}
	
	@PutMapping("/board/review/update")
	public void reviewUpdate(ReviewDTO reviewDTO, List<MultipartFile> files) {
		
		System.out.println("update 컨트롤러 호출 : " + reviewDTO);
		
		
		
		service.reviewUpdate(reviewDTO);
		
		
		
//		if(files ==null) {
//			service.insertReviewImage(imagesDTO);
//			
//		}
		
		//System.out.println("리뷰 인썰트 컨트롤러 호출");
		
		//업로드할 위치 // 현재 날짜 값 폴더
		 if(files!=null && files.get(0).getOriginalFilename() !=null) {
			 
			 main_imagesDTO imagesDTO = new main_imagesDTO();
				
				imagesDTO.setReview_code(reviewDTO.getReview_code());
			 
				
		 
				String upload_path = "D:/k_digital/fileupload";
				//업로드할 위치 // 현재 날짜 값 폴더
				//DB에 저장하여 사용
				try {
					//System.out.println("files : " + files.get(0).getOriginalFilename());
					
					for(int i=0; i<files.size(); i++) {
						
						 //System.out.println("i 번째"+files.get(i));
						 
						 
						String originName = files.get(i).getOriginalFilename(); //파일.png??
						
						//System.out.println("오리진 내임" + originName);
						
						
						String[] tempStr = originName.split("\\."); //파일 구분하려면 \\.
						//System.out.println("tempStr 리스트호출 완료");
						
						//System.out.println("tempStr : " + tempStr[0]);
						
						originName = tempStr[0];
						
						//System.out.println("originNAme + " + originName);
						String type = tempStr[1];
						//System.out.println("type + :"+type);
						String newfilaName = UUID.randomUUID().toString();
						
						File newFile = new File(upload_path, newfilaName+"."+ type);
						
						if(!newFile.exists()) {//폴더가 없을 경우 폴더 만들기
							newFile.mkdir();
						}
						
						files.get(i).transferTo(newFile);
						
						main_imagesDTO images = new main_imagesDTO();
						
						images.setReview_code(imagesDTO.getReview_code());
						images.setFilename(originName);
						images.setType(type);
						images.setFilepath(upload_path+"/" + newfilaName+'.'+type);
						
						
						
						service.insertReviewImage(images);
						
					}// transferTo(File file) > multipartFile을 주어진 file의 경로로 이동 (copy)
				
					} catch(IOException e) {
					System.out.println(e.getMessage());
					
				}
				
		 }
		
		
	}
	                
	@DeleteMapping("/board/review/delete/{review_code}")
	public void reviewdelete(@PathVariable("review_code") int review_code) {
		
		//System.out.println("reviewDelete 컨트롤러 호출");
		
		List<main_imagesDTO> imagesDTO = service.reviewOneSelect(review_code);
		
		
		
		service.deleteReview(review_code);
		
		
		List<main_imagesDTO> imagesDTOList =service.reviewOneSelect(review_code);
		
		
		
		if(imagesDTOList != null) {
		
			for(int i =0; i<imagesDTOList.size(); i++) {
				
				if(imagesDTOList.get(i)!=null) {
					
				
				main_imagesDTO oneimageDTO = new main_imagesDTO();
				
				oneimageDTO.setFilepath(imagesDTOList.get(i).getFilepath());
				
				oneimageDTO.setReview_code(imagesDTOList.get(i).getReview_code());
				
				
				File file = new File(imagesDTOList.get(i).getFilepath());
				
				file.delete();
				
			}
			}
		}
		
		service.deleteReviewImage(review_code);

		
	}
	

	
	

	
	
	@GetMapping("/image/{review_code}")
	public ResponseEntity<?> getImageList(@PathVariable("review_code") int review_code) throws IOException {
	    
		//System.out.println("image 컨트롤러 호출");
		
		List<main_imagesDTO> imagesDTO = service.reviewOneSelect(review_code);
		
		//System.out.println("reviewDTO 호 출"+ imagesDTO);
		
		
		
		if(imagesDTO!=null) {
			
		
		
		List<String> filePaths = new ArrayList<>();// review_code에 해당하는 파일 경로를 DB에서 가져와 리스트에 담음
		
		for(int i=0; i<imagesDTO.size(); i++) {
			
			if(imagesDTO.get(i)!=null) {
				filePaths.add(imagesDTO.get(i).getFilepath());
				
				//System.out.println(i+" : 번째" + imagesDTO.get(i).getFilepath());
			}
			
		}
		
		
		
	    List<byte[]> imageBytesList = new ArrayList<>();
	    for (String filePath : filePaths) {
	        byte[] imageBytes = Files.readAllBytes(Paths.get(filePath));
	        imageBytesList.add(imageBytes);
	    }

	    HttpHeaders headers = new HttpHeaders();
	    //headers.setContentType(MediaType.IMAGE_PNG);
	   // headers.setContentType(new MediaType[] { MediaType.IMAGE_PNG, MediaType.IMAGE_JPEG });    
	    headers.add(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_PNG_VALUE);
	    headers.add(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_JPEG_VALUE);
	    
	    // 여러 개의 이미지 파일을 반환하기 위해 HttpEntity를 리스트로 생성하여 반환
	    HttpEntity<List<byte[]>> httpEntity = new HttpEntity<>(imageBytesList, headers);
	    return new ResponseEntity<>(httpEntity, HttpStatus.OK);
	    
		}
		
		//System.out.println("null 리턴");
		
		
		
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
		
		
	}
	
	@DeleteMapping("/review/updata/delete")
	public void reviewImagesUpdataDelete(@RequestBody ReviewDTO ReviewDTO) {
		
		
		
		
		for(int i =0; i<ReviewDTO.getImagesDTO().size(); i++) {
			
			main_imagesDTO imagesDTO = new main_imagesDTO();
			
			imagesDTO.setFilepath(ReviewDTO.getImagesDTO().get(i).getFilepath());
			
			imagesDTO.setReview_code(ReviewDTO.getReview_code());
			
			service.reviewImagesUpdataDelete(imagesDTO);
			
			File file = new File(ReviewDTO.getImagesDTO().get(i).getFilepath());
			
			file.delete();
			
		}
		
	}
	
	            
	@GetMapping("/mapList/{currentPage}")
	public Map<String, Object> MapSelectList(
			@RequestParam("latitude") String latitude,
			@RequestParam("longitude") String longitude,
			@PathVariable("currentPage") int currentPage
			){
		
		System.out.println("mapList 호출");
		
		System.out.println(latitude);
		System.out.println(longitude);
		
		Map<String, Object> map = new HashMap();;
		
		int totalRecord = service.count(null);
		
		if(totalRecord >=1) {
		
			
			Page_MapDTO pdto = new Page_MapDTO(currentPage, totalRecord);
			
			
			
			pdto.setLatitude(Double.valueOf(latitude));
			pdto.setLongitude(Double.valueOf(longitude));
			
			map.put("mapList", service.MapSelectList(pdto));
			
			
			//System.out.println(service.main_list(pdto));
			
			
			map.put("pvMap", pdto);
			
		}
		
		
		
		return map;
		
	}
	
	
	@PostMapping("/board/filter/{currentPage}")
	public Map<String, Object> filterBoradList(
			@PathVariable("currentPage") int currentPage,
			@RequestBody String[] filterData){
		
		Stream<String> str = Arrays.stream(filterData);
		
		str.forEach(n->System.out.println(n));
		
		List<String> stringList1 = Arrays.asList(filterData);
		
		Map<String, Object> map = new HashMap<>();
		
		Page_TestDTO pageDTO = new Page_TestDTO();
		
		pageDTO.setFileData(stringList1);
		
		int totalRecord = service.main_list_filter_count(pageDTO);
		

		if(totalRecord >=1) {
		
			
			Page_TestDTO page_testDTO = new Page_TestDTO(currentPage,totalRecord);
			
			page_testDTO.setFileData(stringList1);
		
			
			map.put("filter_board_list", service.main_list_filter(page_testDTO));
			
		
			
			//System.out.println(service.main_list(pdto));
			
			
			map.put("pvfilter", page_testDTO);
			
		}
		
		
		
		
		return map;
		
	}
	
	
}
