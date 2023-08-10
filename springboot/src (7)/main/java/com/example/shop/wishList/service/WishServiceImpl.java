package com.example.shop.wishList.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.shop.wishList.dao.WishDAO;
import com.example.shop.wishList.dto.Admin_Sales_pageDTO;
import com.example.shop.wishList.dto.New_User_WishListDTO;
import com.example.shop.wishList.dto.User_ReviewDTO;
import com.example.shop.wishList.dto.WishDTO;
import com.example.shop.wishList.dto.main_images_UserDTO;
import com.example.shop.wishList.dto.user_WishListDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishServiceImpl implements WishService{
	
	private final WishDAO dao;

	@Override
	public int CheckWish(WishDTO wishDTO) {
		
		return dao.CheckWish(wishDTO);
	}

	@Override
	public void delete_wish(WishDTO wishDTO) {
		
		dao.delete_wish(wishDTO);
		
	}

	@Override
	public void insert_wish(WishDTO wishDTO) {
		dao.insert_wish(wishDTO);		
	}

	@Override
	public List<main_images_UserDTO> user_wish_List(user_WishListDTO WishListDTO) {
		
		return dao.user_wish_List(WishListDTO);
	}

	@Override
	public int user_wishList_count(int t_id) {
		
		return dao.user_wishList_count(t_id);
	}

	@Override
	public List<User_ReviewDTO> user_reviewList(user_WishListDTO user_WishListDTO) {
		
		return dao.user_reviewList(user_WishListDTO);
	}

	@Override
	public int user_reviewList_count(int t_id) {
		
		return dao.user_reviewList_count(t_id);
	}

	@Override
	public int user_reviewImagesSelectOne(int review_code) {
		
		return dao.user_reviewImagesSelectOne(review_code);
	}

	

	@Override
	public int admin_sales_count(int main_code) {
		
		return dao.admin_sales_count(main_code);
	}

	@Override
	public List<Admin_Sales_pageDTO> admin_sales(New_User_WishListDTO new_User_WishListDTO) {
		
		return dao.admin_sales(new_User_WishListDTO);
	}

	@Override
	public List<WishDTO> wish_user(int t_id) {
		
		return dao.wish_user(t_id);
	}

}
