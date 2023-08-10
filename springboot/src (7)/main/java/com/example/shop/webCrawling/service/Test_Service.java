package com.example.shop.webCrawling.service;

import com.example.shop.webCrawling.dto.images.ImagesDTO;
import com.example.shop.webCrawling.dto.images.Info_detailDTO;
import com.example.shop.webCrawling.dto.images.Main_hostDTO;

public interface Test_Service {

	public int main_sub_banner(ImagesDTO imagesDTO);
	public int info_detail(Info_detailDTO info_detailDTO);
	public int main_host(Main_hostDTO main_hostDTO);
}
