package com.example.shop.testDate.resources;

import java.io.IOException;
import java.net.URLDecoder;

import org.springframework.core.io.Resource;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolver;

import com.nimbusds.jose.util.StandardCharset;

public class UTF8DecodeResourceResolver extends PathResourceResolver implements ResourceResolver{

	@Override
	protected Resource getResource(String resourcePath, Resource location) throws IOException {
	
		resourcePath = URLDecoder.decode(resourcePath, StandardCharset.UTF_8);
		
		
		return super.getResource(resourcePath, location);
	}

	
	
}
