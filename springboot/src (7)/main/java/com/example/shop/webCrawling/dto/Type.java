package com.example.shop.webCrawling.dto;

import java.io.IOException;



public enum Type {
    PHOTO, THUMB;

    public String toValue() {
        switch (this) {
            case PHOTO: return "photo";
            case THUMB: return "thumb";
        }
        return null;
    }

    public static Type forValue(String value) throws IOException {
        if (value.equals("photo")) return PHOTO;
        if (value.equals("thumb")) return THUMB;
        throw new IOException("Cannot deserialize Type");
    }
    
}