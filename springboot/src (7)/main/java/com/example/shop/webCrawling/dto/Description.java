package com.example.shop.webCrawling.dto;

import java.util.List;

import lombok.Data;

@Data
public class Description {

	private Props prosp;
	
	@Data
	public static class Props{
		
		private PageProps pageProps;
		
		
	}
	
	@Data
	public static class PageProps{
		
		private Space space;
	}
	
	@Data
	public class Space {
	    private long seq;
	    private String name;
	    private String description;
	   
	    
	}
	
	

	
}





