package com.example.shop.wishList.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.shop.wishList.dto.Admin_Sales_pageDTO;
import com.example.shop.wishList.dto.New_User_WishListDTO;
import com.example.shop.wishList.dto.User_ReviewDTO;
import com.example.shop.wishList.dto.WishDTO;
import com.example.shop.wishList.dto.main_images_UserDTO;
import com.example.shop.wishList.dto.user_WishListDTO;

@Mapper
@Repository
public interface WishDAO {
	
	public int CheckWish(WishDTO wishDTO);
	
	public void delete_wish(WishDTO wishDTO);
	
	public void insert_wish(WishDTO wishDTO);
	
	public List<main_images_UserDTO> user_wish_List(user_WishListDTO WishListDTO);
	
	public int user_wishList_count(int t_id);
	
	public List<User_ReviewDTO> user_reviewList(user_WishListDTO user_WishListDTO);
	
	
	public int user_reviewList_count(int t_id);
	
	public int user_reviewImagesSelectOne(int review_code);

	public List<Admin_Sales_pageDTO> admin_sales(New_User_WishListDTO new_User_WishListDTO);
	
	
	public int admin_sales_count(int main_code);
	
	public List<WishDTO> wish_user(int t_id);
	
}
