package com.example.shop.testDate.dto;

import java.util.List;

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
public class main_sub_bannerDTO {

	private int main_code;
	private String main_name;
	private String main_address;
	private String main_logo;
	private String info_detail;
	private String main_comment;
	private double avg_rating;
	private int count_rating;
	
	private int wish_count;
	private double five_star_percentage;
	private int manager_coment;
	
	private WarningDTO warningDTO;
	private Place_InfoDTO placeInfoDTO;
	private Main_ConDTO mainConDTO;
	
	private List<Refund_ruleDTO> refundRuleDTO;
	private List<Main_Sub_PlaceDTO> placeDTO;
	private List<main_imagesDTO> imagesDTO;
	
	
	
}
