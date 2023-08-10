package com.example.shop.webCrawling.dto.images;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@ToString
@Getter
@Setter
public class ImagesDTO {
	
	private int main_code;
	
	private String filename;
	
	private String filepath;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date regdate;
	
	public ImagesDTO() {
	}

	public ImagesDTO(int main_code, String filename, String filepath) {
	
		this.main_code = main_code;
		this.filename = filename;
		this.filepath = filepath;
	}
	
	
	
	
	
	
}
