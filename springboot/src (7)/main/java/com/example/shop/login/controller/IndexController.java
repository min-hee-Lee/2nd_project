package com.example.shop.login.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.shop.login.Service.TestService;
import com.example.shop.login.dto.User;

import lombok.extern.slf4j.Slf4j;


@CrossOrigin("*")
@RestController
@Slf4j
public class IndexController {

	@Autowired
	private TestService service;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	

	
	@PostMapping("/joinadd/idcheck")
	public int idCheck(@RequestBody User user) {
		
		System.out.println("test 호출 : " + user);
		
	
		
		return service.idCheck(user.getT_username());
		
	}
	

	
	
	
	
	
	
	
	@PostMapping("/member/signup")
	public ResponseEntity<?> join(@Valid @RequestBody User user, BindingResult bindingResult) {
		
		
		
		System.out.println("User : "+ user);
		
		
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new HashMap();
			
			for(FieldError error : bindingResult.getFieldErrors()) {
				errors.put(error.getField(), error.getDefaultMessage());
			}
			
			//return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
			return ResponseEntity.badRequest().body(errors);
		}
		
		
		
		user.setT_role("ROLE_USER");
		
		
		
		String encPassword = bCryptPasswordEncoder.encode(user.getT_password());
		
		user.setT_password(encPassword);
		
		service.insertMember(user); // 패스워드가 암호화가 되어있지않아서 시큐리티로 로그인 할수 없음
		
		
		return ResponseEntity.ok().build();		
	}
	
	
	
	
	
	@Secured("ROLE_ADMIN") //하나만 
	@ResponseBody
	@GetMapping("/info")
	public String info() {
		
		return "개인정보";
	}
	
	 
	//Post는 메서드 발동 후에 발동돼서 잘안씀
	//Pre는 메서드 발동 전에 발동 
	//여러개 
	@PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
	@ResponseBody
	@GetMapping("/data")
	public String data() {
		return "데이터정보";
	}
	
	@GetMapping("/user/userInfo")
	public User userInfoSelect(
			@RequestParam("t_username") String t_username
			) {
		
		User user = null;
		
		
		if(t_username !=null && !t_username.isEmpty()) {
			user = service.userInfo_Select(t_username);
			
		}
		
		
		return user;
		
	}
	
	@PutMapping("/user/userInfoUpdate")
	public ResponseEntity<?> userInfoUpdate(@Valid @RequestBody User user, BindingResult bindingResult) {
		
		
		
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new HashMap();
			
			for(FieldError error : bindingResult.getFieldErrors()) {
				errors.put(error.getField(), error.getDefaultMessage());
			}
			
			//return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
			return ResponseEntity.badRequest().body(errors);
		}
		
		String encPassword = bCryptPasswordEncoder.encode(user.getT_password());
		
		user.setT_password(encPassword);
		
		service.userInfo_update(user);
	
	
	
		return ResponseEntity.ok().build();
	}
	
}























