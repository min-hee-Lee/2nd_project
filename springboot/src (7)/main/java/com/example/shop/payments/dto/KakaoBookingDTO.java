package com.example.shop.payments.dto;

public class KakaoBookingDTO {

		
		private String name;
		private String room_name;
		private String checkin;
		private String checkout;
	
		private String days;
		private String totalPrice;
		
		private String mem_code;
		private String hotel_code;
		private String room_code;
		
		private String guests;
		
		public KakaoBookingDTO() {
		}

		public KakaoBookingDTO(String name, String room_name, String checkin, String checkout, String days,
				String totalPrice, String mem_code, String hotel_code, String room_code, String guests) {
			this.name = name;
			this.room_name = room_name;
			this.checkin = checkin;
			this.checkout = checkout;
			this.days = days;
			this.totalPrice = totalPrice;
			this.mem_code = mem_code;
			this.hotel_code = hotel_code;
			this.room_code = room_code;
			this.guests = guests;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getRoom_name() {
			return room_name;
		}

		public void setRoom_name(String room_name) {
			this.room_name = room_name;
		}

		public String getCheckin() {
			return checkin;
		}

		public void setCheckin(String checkin) {
			this.checkin = checkin;
		}

		public String getCheckout() {
			return checkout;
		}

		public void setCheckout(String checkout) {
			this.checkout = checkout;
		}

		public String getDays() {
			return days;
		}

		public void setDays(String days) {
			this.days = days;
		}

		public String getTotalPrice() {
			return totalPrice;
		}

		public void setTotalPrice(String totalPrice) {
			this.totalPrice = totalPrice;
		}

		public String getMem_code() {
			return mem_code;
		}

		public void setMem_code(String mem_code) {
			this.mem_code = mem_code;
		}

		public String getHotel_code() {
			return hotel_code;
		}

		public void setHotel_code(String hotel_code) {
			this.hotel_code = hotel_code;
		}

		public String getRoom_code() {
			return room_code;
		}

		public void setRoom_code(String room_code) {
			this.room_code = room_code;
		}

		public String getGuests() {
			return guests;
		}

		public void setGuests(String guests) {
			this.guests = guests;
		}

		@Override
		public String toString() {
			return "KakaoBookingDTO [name=" + name + ", room_name=" + room_name + ", checkin=" + checkin + ", checkout="
					+ checkout + ", days=" + days + ", totalPrice=" + totalPrice + ", mem_code=" + mem_code
					+ ", hotel_code=" + hotel_code + ", room_code=" + room_code + ", guests=" + guests + "]";
		}

		
		
		
		
	
}
