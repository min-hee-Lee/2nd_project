package com.example.shop.payments.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shop.payments.dao.PayDAO;
import com.example.shop.payments.dto.Admin_UserInfoDTO;
import com.example.shop.payments.dto.Admin_User_InfoDTO;
import com.example.shop.payments.dto.Admin_User_ReviewDTO;
import com.example.shop.payments.dto.BookingDTO;
import com.example.shop.payments.dto.Booking_Time_CheckDTO;
import com.example.shop.payments.dto.KakaoPay_KeyDTO;
import com.example.shop.payments.dto.Page_BookingDTO;
import com.example.shop.payments.dto.Payments_KeyDTO;
import com.example.shop.testDate.dto.Page_TestDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PayServicelmpl implements PayService{
	
	
	private final PayDAO dao;

	@Override
	public void Insert_tossPayments(BookingDTO bookingDTO, Payments_KeyDTO payments_KeyDTO) {

		dao.Insert_tossPayments(bookingDTO);
		
		System.out.println("bookingDTO sequence " + bookingDTO.getBooking_code());
		
		payments_KeyDTO.setBooking_code(bookingDTO.getBooking_code());
		
		System.out.println(payments_KeyDTO);
		
		dao.Insert_Key_tossPayments(payments_KeyDTO);
		
	}

	@Override
	public void Insert_kakaopay(BookingDTO bookingDTO, KakaoPay_KeyDTO kakaoPay_KeyDTO) {
		dao.Insert_tossPayments(bookingDTO);
		
		kakaoPay_KeyDTO.setBooking_code(bookingDTO.getBooking_code());
		
		dao.kakao_Key(kakaoPay_KeyDTO);
		
	}

	@Override
	public List<BookingDTO> admin_bookingList(Page_BookingDTO page_BookigListDTO) {
		
		return dao.admin_bookingList(page_BookigListDTO);
	}

	@Override
	public int count_admin_bookingList() {
		
		return dao.count_admin_bookingList();
	}

	@Override
	public List<BookingDTO> user_bookingList(Page_BookingDTO page_BookigListDTO) {
		
		
		
		return dao.user_bookingList(page_BookigListDTO);
	}

	@Override
	public int count_user_bookingList(int t_id) {
		
		return dao.count_user_bookingList(t_id);
	}

	@Override
	public KakaoPay_KeyDTO kakaoPay_Cencle(int booking_code) {
		
		System.out.println("service : " + dao.kakaoPay_Cencle(booking_code));
		
		return dao.kakaoPay_Cencle(booking_code);
	}

	@Override
	public void bookingCancel(int booking_code) {
		
		dao.bookingCancel(booking_code);
		
	}

	@Override
	public String toss_payments_Cencle(int booking_code) {
		
		return dao.toss_payments_Cencle(booking_code);
	}

	@Override
	public List<Admin_User_InfoDTO> admin_userInfo(Admin_UserInfoDTO admin_UserInfoDTO) {
		
		return dao.admin_userInfo(admin_UserInfoDTO);
	}

	@Override
	public int admin_userInfo_count(String filename) {
	
		return dao.admin_userInfo_count(filename);
	}

	@Override
	public List<Booking_Time_CheckDTO> booking_Time_Check(Booking_Time_CheckDTO checkDTO) {
		
		return dao.booking_Time_Check(checkDTO);
	}

	@Override
	public List<Admin_User_ReviewDTO> admin_Review_List(Admin_UserInfoDTO admin_userInfoDTO) {
		
		return dao.admin_Review_List(admin_userInfoDTO);
	}

	@Override
	public int admin_Review_count(String content) {
	
		return dao.admin_Review_count(content);
	}

	
	
	



	


	
}
