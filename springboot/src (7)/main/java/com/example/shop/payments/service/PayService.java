package com.example.shop.payments.service;

import java.util.List;

import com.example.shop.payments.dto.Admin_UserInfoDTO;
import com.example.shop.payments.dto.Admin_User_InfoDTO;
import com.example.shop.payments.dto.Admin_User_ReviewDTO;
import com.example.shop.payments.dto.BookingDTO;
import com.example.shop.payments.dto.Booking_Time_CheckDTO;
import com.example.shop.payments.dto.KakaoPay_KeyDTO;
import com.example.shop.payments.dto.Page_BookingDTO;
import com.example.shop.payments.dto.Payments_KeyDTO;
import com.example.shop.testDate.dto.Page_TestDTO;

public interface PayService {
	
	public void Insert_tossPayments(BookingDTO bookingDTO, Payments_KeyDTO payments_KeyDTO);
	
	public void Insert_kakaopay(BookingDTO bookingDTO, KakaoPay_KeyDTO kakaoPay_KeyDTO);
	
	/////////////////////////////////////////////////
	
	public List<BookingDTO> admin_bookingList(Page_BookingDTO page_BookigListDTO);
	public int count_admin_bookingList();
	
	public List<BookingDTO> user_bookingList(Page_BookingDTO page_BookigListDTO);
	public int count_user_bookingList(int t_id);
	
	public KakaoPay_KeyDTO kakaoPay_Cencle(int booking_code);
	
	
	public void bookingCancel(int booking_code);
	
	public String toss_payments_Cencle(int booking_code);
	
	public List<Admin_User_InfoDTO> admin_userInfo(Admin_UserInfoDTO admin_UserInfoDTO);
	
	public int admin_userInfo_count(String filename);
	
	public List<Booking_Time_CheckDTO> booking_Time_Check(Booking_Time_CheckDTO checkDTO);
	
	public List<Admin_User_ReviewDTO> admin_Review_List(Admin_UserInfoDTO admin_userInfoDTO);
	
	public int admin_Review_count(String content);

}
