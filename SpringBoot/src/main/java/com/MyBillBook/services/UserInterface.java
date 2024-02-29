package com.MyBillBook.services;

import java.util.List;

import com.MyBillBook.entity.User;


public interface UserInterface {

	public List<User> findByUseremail(String s);

	User saveUser(User user);

	 public User loginUser(String useremail, String password) ;
		
	 
}
