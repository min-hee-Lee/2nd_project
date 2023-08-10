// JSONPaserDTO.java

package com.example.shop.webCrawling.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonPaserDTO {
    private Props props;
    private String page;
    private Query query;
    private String buildId;
    private boolean isFallback;
    private boolean gsp;
    private boolean customServer;
    private List<Object> scriptLoader;
    

    
 // Props.java


    @Data
    public static class Props {
        private PageProps pageProps;
        private boolean nssg;
    }

    // PageProps.java



    @Data	
    public static class PageProps {
        private Space space;
        private Object spaceError;
    }

    // Space.java


    @Data
    public static class Space {
        private long seq;
        private String name;
        private String description;
        private long displayType;
        private long manageType;
        private long favoriteCount;
        private Host host;
        private List<Photo> photos;
        private List<Object> tags;
        private List<Object> tips;
        private boolean active;
    }

    // Host.java


    @Data
    public static class Host {
        private long seq;
        private String name;
        private String address;
        private String description;
        
        private long type;
        private double latitude;
        private double longitude;
        private Image image;
        private Building building;
    }

    // Building.java

  

    @Data
    public static class Building {
        private long seq;
        private String name;
        private double latitude;
        private double longitude;
    }

    // Image.java

  

    @Data
    public static class Image {
        private String path;
        private String name;
        private String resourcePath;
        private boolean empty;
    }

    // Photo.java

  

    @Data
    public static class Photo {
        private long seq;
        private String type;
        private long order;
        private Image file;
    }

    // Query.java

    @Data	
    public static class Query {
    	
    	
        private String venueId;
    }

    
    
}

