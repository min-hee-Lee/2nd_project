package com.example.shop.login.Service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shop.login.dao.TestDAO;
import com.example.shop.login.dto.ForgotPasswordDTO;
import com.example.shop.login.dto.User;


@Service
public class Login_ServiceImpl implements TestService{

	@Autowired
	private TestDAO dao;
	
	@Override
	public int insertMember(User user) {
		return dao.insertMember(user);
	}

	@Override
	public User SelectByMember(String username) {
		return dao.SelectByMember(username);
	}

	@Override
	public int idCheck(String t_username) {
		return dao.idCheck(t_username);
	}

	
	@Override
	public User SelectByMemberEmail(ForgotPasswordDTO forgotPasswordDTO) {
		return dao.SelectByMemberEmail(forgotPasswordDTO);
	}

	@Override
	public void updatePassword(User user) {
			
		dao.updatePassword(user);
	}

	@Override
	public User userInfo_Select(String t_username) {
		
		return dao.userInfo_Select(t_username);
	}

	@Override
	public void userInfo_update(User user) {
		
		dao.userInfo_update(user);
	}


}
