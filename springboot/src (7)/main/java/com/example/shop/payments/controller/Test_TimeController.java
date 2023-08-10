package com.example.shop.payments.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shop.payments.dto.BookingDTO;
import com.example.shop.payments.service.PayService;


@CrossOrigin("*")
@RestController
public class Test_TimeController {

	@Autowired
	private PayService service;
	
	
	@PostMapping("/test/time")
	public ResponseEntity<?> test_Time(BookingDTO bookingDTO) {
		
//		System.out.println("컨트롤러 호출");
//		
//		System.out.println(bookingDTO);
//		
//		if(bookingDTO==null) {
//			
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("시간을 선택해주세요.");
//		}
//		
//		List<Integer> timeChekList = bookingDTO.getTime_check();
//		
//		int checKNum0 = timeChekList.get(0);
//		int checKNum1 = timeChekList.get(1);
//		int checkSize = timeChekList.size();
//		
////		if(checkSize == 1 && checKNum0==23) {
////			
////			time_TestDTO.setStart_time(checKNum0);
////			time_TestDTO.setEnd_time(0);
////			}
//		
//		
//		if(checkSize == 1) {
//			
//			
//			
//			bookingDTO.setStart_time(checKNum0);
//			bookingDTO.setEnd_time(checKNum0+1);
//			
//		} else if(checkSize == 2 && checKNum0>checKNum1) {
//			
//			
//			bookingDTO.setStart_time(checKNum1);
//			bookingDTO.setEnd_time(checKNum0+1);
//			
//		} else if(checkSize == 2 && checKNum0<checKNum1) {
//			
//			bookingDTO.setStart_time(checKNum0);
//			bookingDTO.setEnd_time(checKNum1+1);
//		}
//		
//		
//		service.Insert_booking(bookingDTO);
		
		
		return ResponseEntity.ok("예약이 완료 되었습니다");
	}
	
	

	
}
