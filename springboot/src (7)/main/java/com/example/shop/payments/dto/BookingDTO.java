package com.example.shop.payments.dto;

import java.util.List;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BookingDTO {
	
	
	
	private int booking_code;
	private int t_id;
	private int main_code;
	
	private String main_name; // 상품명
	
	private String booking_date; //예약한 날짜
	private String cancle_date; //취소 날짜
	private String use_date;  // 사용할 날짜
	
	private String start_time;
	private String end_time;
	
	private int cost;
	private String booking_state;
	
	private String provider;
	private String type;
	
	private List<Integer> time_check;
	
	
	
	private main_PageImagesDTO user_PageDTO;
	
//	private String filepath;
//	private String filename;
	
	//private Main_host_UserPageDTO UserPageDTO;
	
}
