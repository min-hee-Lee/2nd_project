package com.example.shop.login.config.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.shop.login.dao.TestDAO;
import com.example.shop.login.dto.User;



@Service
public class PrincipalDetailsService implements UserDetailsService{
	
	@Autowired
	private TestDAO dao;
	
	//시큐리티 session(내부 Authentication(내부 UserDetails))
	//함수 종료시 @AuthenticationPrincipal 어노테이션이 만들어진다.
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		System.out.println("username : " + username );
		
		User user = dao.SelectByMember(username);
		
		System.out.println("user : "+ user);
		
		if(user != null) {
			
			System.out.println("PrincipalDetails 생성");
			return new PrincipalDetails(user);
		}
		
		return null;
	}

	 
	
	
}
