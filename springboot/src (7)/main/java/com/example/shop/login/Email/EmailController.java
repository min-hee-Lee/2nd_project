package com.example.shop.login.Email;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.shop.login.dao.TestDAO;
import com.example.shop.login.dto.ForgotPasswordDTO;
import com.example.shop.login.dto.User;



@RestController
public class EmailController {
	
	@Autowired
	private TestDAO dao;
	
	@Autowired
	private EmailService emailService;
	
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	 
	
	@PostMapping("/forget-password")
	public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordDTO forgetPasswordDTO){
		
		System.out.println(forgetPasswordDTO);
		
		User user = dao.SelectByMemberEmail(forgetPasswordDTO);
		
		if(user==null) {
			
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("아이디 또는 이메일 주소를 다시 확인해주세요.");
		}
		
		//임시 비밀번호 생성
		String tempPassword = UUID.randomUUID().toString().substring(3,15);
		
		//임시 비밀번호 이메일로 전송
		emailService.sendEmail(user.getT_email(),"임시 비밀번호 발급" ,"임시 비밀번호 : " + tempPassword);
		
		//사용자 정보 업데이트
		
		user.setT_password(bCryptPasswordEncoder.encode(tempPassword));		
		
		
		
		
		dao.updatePassword(user);
		
		
		
		
		return ResponseEntity.ok("이메일로 임시 비밀번호가 발송되었습니다.");
		
		
		
		
	}
	
	
}
