package com.example.shop.testDate.resources;

import java.util.concurrent.TimeUnit;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcImagesConfig implements WebMvcConfigurer{

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
	
		registry.addResourceHandler("/images/**")
		.addResourceLocations("D:/k_digital/fileupload/")
		.setCachePeriod(3600)
        .resourceChain(true)
		.addResolver(new UTF8DecodeResourceResolver());
	}

	
	
}
