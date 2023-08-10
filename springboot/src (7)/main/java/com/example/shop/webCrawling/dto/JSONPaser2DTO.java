// JSONPaser2DTO.java

package com.example.shop.webCrawling.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.IOException;
import lombok.Data;

/*
 * @JsonProperty 어노테이션 사용하기: Jackson 라이브러리를 사용하는 경우, 클래스의 필드명과 JSON 데이터의 필드명이 일치하지 않는 경우 @JsonProperty 어노테이션을 사용하여 매핑을 지정할 수 있습니다. 예를 들어, 클래스의 필드명을 "building"으로 유지하고, 다음과 같이 @JsonProperty 어노테이션을 사용하여 JSON 데이터의 필드명을 지정할 수 있습니다:
 * */

// PageProps.java
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class JSONPaser2DTO {
    private Props props;
    private String page;
    private Query query;
    private String buildId;
    private boolean isFallback;
    private boolean gsp;
    private boolean customServer;
    private List<Object> scriptLoader;
    
    @JsonProperty("building")
    private String someOtherFieldName;
    
    
    @Data
    public class Props {
        private PageProps pageProps;
        private boolean nSsg;
    }
    
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
        private List<Tag> tags;
        private List<Tip> tips;
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
        private Operation operation;
    }

    // Image.java



    @Data
    public static class Image {
    	@JsonIgnore
        private Path path;
        private String name;
        private String resourcePath;
        private boolean empty;
    }

    // Path.java



    

   

    // Operation.java



    @Data
    public static class Operation {
        private String businessStartTime;
        private String businessEndTime;
        private boolean allDay;
    }

    // Photo.java


    @Data
    public static class Photo {
        private long seq;
        @JsonIgnore
        private Type type;
        private long order;
        private Image file;
    }

    // Type.java





    

    // Tag.java



    @Data
    public static class Tag {
        private String name;
    }

    // Tip.java



    @Data
    public static class Tip {
        private String name;
        private String content;
    }

    // Query.java



    @Data
    public static class Query {
        private String venueId;
    }

}



   
    


// Props.java




