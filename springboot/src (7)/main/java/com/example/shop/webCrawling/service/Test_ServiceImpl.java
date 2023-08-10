package com.example.shop.webCrawling.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shop.webCrawling.dao.Test_DAO;
import com.example.shop.webCrawling.dto.images.ImagesDTO;
import com.example.shop.webCrawling.dto.images.Info_detailDTO;
import com.example.shop.webCrawling.dto.images.Main_hostDTO;

@Service
public class Test_ServiceImpl implements Test_Service{
	
	@Autowired
	private Test_DAO dao;

	@Override
	public int main_sub_banner(ImagesDTO imagesDTO) {
		
	
		
		return dao.main_sub_banner(imagesDTO);
	}

	@Override
	public int info_detail(Info_detailDTO info_detailDTO) {
		
		return dao.info_detail(info_detailDTO);
	}

	@Override
	public int main_host(Main_hostDTO main_hostDTO) {
		return dao.main_host(main_hostDTO);
	}

	
	

	
}
