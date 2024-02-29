package com.MyBillBook.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyWebMvcConfigurer implements WebMvcConfigurer {
	 @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**")
	                .allowedOrigins("http://localhost:4200") 
	                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") 
	                .allowedHeaders("*") 
	                .allowCredentials(true);
	    }
	 
	 @Override
	    public void addResourceHandlers(ResourceHandlerRegistry registry) {
	        registry.addResourceHandler("/**")
	                .addResourceLocations("classpath:/static/", "classpath:/public/", "file:.C:\\Users\\chetn\\Desktop\\chetna\\Angular_project\\MyBillBook", "/")
	                .setCachePeriod(0); // Setting cache period to 0 disables caching
	    }
	 
}

