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
public class KakaoPay_KeyDTO {
	
		private int booking_code;
        private String cid;
        private String tid;
        private String cancel_amount;
        private String cancel_tax_free_amount;
        private String cancel_vat_amount;
		
       
        
        
        
        
        
}
