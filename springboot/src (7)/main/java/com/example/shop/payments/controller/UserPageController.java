package com.example.shop.payments.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.shop.payments.dto.Admin_UserInfoDTO;
import com.example.shop.payments.dto.Admin_User_InfoDTO;
import com.example.shop.payments.dto.Page_BookingDTO;
import com.example.shop.payments.service.PayService;


import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController

public class UserPageController {
	
	@Autowired
	private PayService service;
	
	@GetMapping("/admin/payPage/{currentPage}")
	public Map<String, Object> userBookingList(@PathVariable("currentPage") int currentPage) {
		
		System.out.println(currentPage);
		
		Map<String, Object> map = new HashMap();
		
		
		
		
		
		int totalRecord = service.count_admin_bookingList();
		
		if(totalRecord >=1) {
		
			
			Page_BookingDTO pdto = new Page_BookingDTO(currentPage, totalRecord);
			
			//System.out.println("컨르롤러 Pto : " + pdto);
			
			map.put("adminPayList", service.admin_bookingList(pdto));
			
			//System.out.println(service.main_list(pdto));
			
			
			map.put("pv", pdto);
			
		}
		
		return map;
		
		
	}
	
	@GetMapping("/admin/userInfo/{currentPage}")
	public Map<String, Object> admin_userInfo(
			@PathVariable("currentPage") int currentPage,
			@RequestParam("t_username") String t_username
			){
		
		System.out.println("userInfo 컨트롤러 : " + t_username);
		
		Map<String, Object> map = new HashMap<>();
		int totalRecord = 1;
		
		if(t_username !=null && !t_username.isEmpty()) {
			
	
		totalRecord= service.admin_userInfo_count(t_username);
			
		} else {
			totalRecord= service.admin_userInfo_count(t_username);
		}
		
		
		
		if(totalRecord >=1) {
			
			
			
			Admin_UserInfoDTO pdto = new Admin_UserInfoDTO(currentPage, totalRecord);
			
			
			if(t_username !=null && !t_username.isEmpty()) {
				
				pdto.setT_username(t_username);
				
				System.out.println(pdto);
				System.out.println(service.admin_userInfo(pdto));
				map.put("Admin_User_Info", service.admin_userInfo(pdto));
				
			}else {
				map.put("Admin_User_Info", service.admin_userInfo(pdto));
			}
			
			
			
			
			//System.out.println(service.main_list(pdto));
			
			
			map.put("pvAdmin_User_Info", pdto);
		
		}
		
		return map;
		
	}
	
	@GetMapping("/user/payPage/{currentPage}")
	public Map<String, Object> userBookingList(
			@PathVariable("currentPage") int currentPage,
			@RequestParam("t_id") String t_id) {
		
		System.out.println(t_id);
		
		Map<String, Object> map = new HashMap();
		
		int totalRecord = service.count_user_bookingList(Integer.parseInt(t_id));
		
		System.out.println(totalRecord);
		
		if(totalRecord >=1) {
			
			
			
			Page_BookingDTO pdto = new Page_BookingDTO(currentPage, totalRecord);
			
			pdto.setT_id(Integer.parseInt(t_id));
			
			//System.out.println("컨르롤러 Pto : " + pdto);
			
			System.out.println(service.user_bookingList(pdto));
			map.put("userPayList", service.user_bookingList(pdto));
			
			//System.out.println(service.main_list(pdto));
			
			
			map.put("pv", pdto);
			
		}
		
		return map;
		
		
	}
	
	
	@GetMapping("/admin/ReviewList/{currentPage}")
	public Map<String, Object> adminReviewList(
			@PathVariable("currentPage") int currentPage,
			@RequestParam("content") String content
			){
		
		System.out.println("admin_ReviewList 컨트롤러 호출 : " + content + currentPage);
		
		Map<String, Object> map = new HashMap<>();
		
		int totalRecord = 1;
			
			if(content !=null && !content.isEmpty()) {
				
		
			totalRecord= service.admin_Review_count(content);
				
			} else {
				totalRecord= service.admin_Review_count(content);
			}
			
		
		
		if(totalRecord >=1) {
			
			
			
			Admin_UserInfoDTO pdto = new Admin_UserInfoDTO(currentPage, totalRecord);
			
			
			if(content !=null && !content.isEmpty()) {
				
				pdto.setContent(content);
				map.put("Admin_Review_List", service.admin_Review_List(pdto));
				
			}else {
				map.put("Admin_Review_List", service.admin_Review_List(pdto));
				
				System.out.println("Admin_Review_List : "+service.admin_Review_List(pdto));
			}
			
			
			
			
			//System.out.println(service.main_list(pdto));
			
			
			map.put("pvAdmin_Review_List", pdto);
		
		}
		
		
		
		
		
		
		return map;
		
		
	}
	
}
