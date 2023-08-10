package com.example.shop.webCrawling.dto.images;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Info_detailDTO {
	
		private int main_code;
		private String info_detail;
		
		public Info_detailDTO() {

		}

		public Info_detailDTO(int main_code, String info_detail) {
			this.main_code = main_code;
			this.info_detail = info_detail;
		}
		
		
		
		
}
