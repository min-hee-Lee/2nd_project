package com.example.shop.login.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class User {

	private int t_id;
	
	
	@NotBlank(message = "필수 입력입니다.")
	@Pattern(regexp = "[a-zA-Z0-9]{8,20}", message = " 8자리 ~ 20자리 숫자 또는 문자만 가능합니다.")
	private String t_username;
	
	@NotBlank(message = "필수 입력입니다.")
	@Pattern(regexp = "^.*(?=^.{8,20}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$",message="비밀번호는 8~20자리의 숫자, 문자, 특수문자로 이루어져야 합니다.")
	private String t_password;
	
	@NotBlank(message = "필수 입력입니다.")
	@Email(message = "email 형식을 지켜주세요.")
	@Size(min = 6, max = 30)
	private String t_email;
	
	@NotBlank(message = "필수 입력입니다.")
	private String t_address;
	
	@Pattern(regexp = "^\\d{2,3}-\\d{3,4}-\\d{4}$", message = "핸드폰 번호의 약식과 맞지 않습니다. xxx-xxx(x)-xxxx")
	@NotBlank(message = "필수 입력입니다.")
	private String t_phone;
	
	@NotBlank(message = "비밀번호 확인은 필수 입니다.")
	private String t_password2;
	
	
	private String t_role; // ROLE_USER, ROLE_ADMIN
	
	private String t_createDate;
	
	private String t_modiDate;
	private String t_bigo;
	
	private String provider;
	private String providerId;
	
	@Builder
	public User(String t_username, String t_password, String t_email, 
			String t_role, String provider,
			String t_address, String t_phone,
			String t_createDate,
			String providerId) {
		this.t_username = t_username;
		this.t_password = t_password;
		this.t_email = t_email;
		this.t_role = t_role;
		this.provider = provider;
		this.providerId = providerId;
		this.t_address= t_address;
		this.t_phone=t_phone;
		this.t_createDate=t_createDate;
		
		
	}
	
	
	
	
	
	
}
