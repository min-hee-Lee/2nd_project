package com.example.shop.payments.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class KakaoReadyResponse {
		
	private String tid; // 결제 고유 번호
    private String next_redirect_mobile_url; // 모바일 웹일 경우 받는 결제페이지 url
    private String next_redirect_pc_url; // pc 웹일 경우 받는 결제 페이지
    private String next_redirect_app_url;
    private String created_at;
	private String android_app_scheme;
	private String ios_app_scheme;
	
	private Card_infoDTO card_info; 
	
	private boolean tms_result;
	
	
	
    
    
    
    
    
}
