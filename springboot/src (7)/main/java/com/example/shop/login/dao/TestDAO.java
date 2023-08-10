package com.example.shop.login.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.shop.login.dto.ForgotPasswordDTO;
import com.example.shop.login.dto.User;



@Mapper
@Repository
public interface TestDAO {
	
	public int insertMember(User user);
	
	public User SelectByMember(String username);
	
	public int idCheck(String t_username);
	
	public User SelectByMemberEmail(ForgotPasswordDTO forgotPasswordDTO);
	
	public void updatePassword(User user);
	
	public User userInfo_Select(String t_username);
	
	public void userInfo_update(User user);
	
}
