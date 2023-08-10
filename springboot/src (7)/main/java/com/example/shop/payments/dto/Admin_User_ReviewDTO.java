package com.example.shop.payments.dto;

import java.sql.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.shop.login.dto.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Admin_User_ReviewDTO {
	
	private int rm;
	private int review_code;
	private int main_code;
	private int t_id;
	private int booking_code;
	private String content;
	
	private int rating_value;
	private String regdate;
	private String moddate;
	private int readcount, ref, re_step, re_level;
	
	
	
	
	//파일 첨부
	private String upload;
	
	//form페이지에서 파일첨부를 받아 처리해주는 멤버변수
	private List<MultipartFile> filename;
	
	
	private User user;
	

	
	
	
}























































































