package com.MyBillBook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
//@EnableAutoConfiguration

@SpringBootApplication
@ComponentScan(basePackages = "com.MyBillBook")

public class MyBillBookApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyBillBookApplication.class, args);
	}

}
