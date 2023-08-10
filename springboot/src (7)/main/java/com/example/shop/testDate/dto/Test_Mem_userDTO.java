package com.example.shop.testDate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Test_Mem_userDTO {
		
	private int t_id;
	private String mem_Id;
	private String mem_Pwd;
	private String mem_Email;
	private String mem_Name;
	private String mem_loc;
	private String mem_Phone;
	private String mem_Type;
	private String regdate;
	private String moddate;
	private char bigo;
	
}
