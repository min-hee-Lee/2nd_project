package com.example.shop.payments.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class Admin_User_InfoDTO {

	private int t_id;
	
	private String t_username;
	
	private String t_password;
	
	private String t_email;
	
	
	private String t_address;
	
	private String t_phone;
	
	
	private String t_password2;
	
	
	private String t_role; // ROLE_USER, ROLE_ADMIN
	
	private String t_createDate;
	
	private String t_modiDate;
	private String t_bigo;
	
	private String provider;
	private String providerId;
	
}
