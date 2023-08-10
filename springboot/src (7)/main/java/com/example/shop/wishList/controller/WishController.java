package com.example.shop.wishList.controller;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PrimitiveIterator.OfDouble;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.shop.payments.dto.Page_BookingDTO;
import com.example.shop.wishList.dto.Admin_Sales_pageDTO;
import com.example.shop.wishList.dto.New_User_WishListDTO;
import com.example.shop.wishList.dto.User_ReviewDTO;
import com.example.shop.wishList.dto.WishDTO;
import com.example.shop.wishList.dto.Wish_Select_UserDTO;
import com.example.shop.wishList.dto.user_WishListDTO;
import com.example.shop.wishList.service.WishService;

import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class WishController {


	private final WishService service;
	
	
	
	@PostMapping("/wishList")
	public ResponseEntity<?> wishList(@RequestBody WishDTO wishDTO){
		
		System.out.println("wishList 컨트롤러 호출 : " + wishDTO);
		
		if(service.CheckWish(wishDTO)==1) {
			
			service.delete_wish(wishDTO);
			
			return ResponseEntity.ok("찜기능 해제 !");
			
		} 
		
		
		service.insert_wish(wishDTO);
		
		
		return ResponseEntity.ok("찜 등록 ! ");
	}
	
	
	@GetMapping("/user/wishList/{currentPage}")
	public Map<String, Object> userWishList(
			@PathVariable("currentPage") int currentPage,
			@RequestParam("t_id") int t_id){
		
		Map<String, Object> map = new HashMap<>();
		
		int totalRecord = service.user_wishList_count(t_id);
		
		System.out.println("wishList totalRecord : " + totalRecord);
		
		if(totalRecord >=1) {
		
			user_WishListDTO pdto = new user_WishListDTO(currentPage, totalRecord);
			
			pdto.setT_id(t_id);
			
			
			map.put("userWishList", service.user_wish_List(pdto));
			
			
			
			//System.out.println(service.main_list(pdto));
			
			
			map.put("pvWishList", pdto);
			
		}
		
		
		return map;
		
		
	}
	
	
	@GetMapping("/user/reviewList/{currentPage}")
	public Map<String, Object> userReviewList(
			@PathVariable("currentPage") int currentPage,
			@RequestParam("t_id") int t_id){
		
		Map<String, Object> map = new HashMap<>();
		
		int totalRecord = service.user_reviewList_count(t_id);
		
		System.out.println("reviewList totalRecord : " + totalRecord);
		
		if(totalRecord >=1) {
		
			user_WishListDTO pdto = new user_WishListDTO(currentPage, totalRecord);
			
			pdto.setT_id(t_id);
			
			
			
			map.put("UserReviewList", service.user_reviewList(pdto));
			
			map.put("pvUserReviewList", pdto);

			
			
			
		}
		
		return map;
		
		
	}
	
	@GetMapping("/admin/SalesList/{currentPage}")
	public Map<String, Object> adminSalesList(
			@PathVariable("currentPage") int currentPage,
			@RequestParam(value = "filename", required = false) String filename
			
			){
		
		//System.out.println("SalesList 컨트롤러 호출");
		
		//System.out.println("@@@@@@@@@@@@@filename : "+ filename);
		
		Map<String, Object> map = new HashMap<>();
		
		int totalRecord = 1;
		
//		System.out.println("reviewList totalRecord : " + totalRecord);
		
		if(totalRecord >=1) {
		
			
			List<Admin_Sales_pageDTO> admin_SalesList=null;
			
			New_User_WishListDTO pdto = null;
			
			if(filename !=null && !filename.isEmpty()) {
				
				
				
					
				pdto = new New_User_WishListDTO(currentPage, totalRecord);
				
				pdto.setFilename(filename);
				//System.out.println();
				
				System.out.println("pdto : "+pdto);
				admin_SalesList= service.admin_sales(pdto);
				//System.out.println("admin_SalesList : "+ admin_SalesList);
				//System.out.println("하나 리스트 호출");
			
				
				
			} else {
		
				
				//System.out.println("하나리스트 " + totalRecord);
				
				totalRecord = service.admin_sales_count(0);
				
				pdto = new New_User_WishListDTO(currentPage, totalRecord);
				
				//System.out.println("하나리스트 pdto : " + pdto);
				
				admin_SalesList= service.admin_sales(pdto);
			}
			
			
		
			
			
			
			
			map.put("Admin_sales_List", admin_SalesList);
			
			map.put("pvAdmin_sales_List", pdto);

			
			
			
		}
		
		return map;
	
	}
	
	@PostMapping("/wishUser")
	public Map<String, Object> wishUser(
			@RequestBody Wish_Select_UserDTO wish_Select_UserDTO
			
			){
		
		System.out.println(wish_Select_UserDTO);
		
		Map<String, Object> map = new HashMap<>();
		
		if(wish_Select_UserDTO.getT_id() !=null && !wish_Select_UserDTO.getT_id().isEmpty()) {
			
			
			map.put("wish_Select_List", service.wish_user(Integer.parseInt(wish_Select_UserDTO.getT_id())));
			System.out.println(service.wish_user(Integer.parseInt(wish_Select_UserDTO.getT_id())));
		}
		
		
		return map;
		
	}

	
}
