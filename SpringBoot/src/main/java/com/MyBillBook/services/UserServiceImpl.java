package com.MyBillBook.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MyBillBook.Repository.UserRepository;
import com.MyBillBook.entity.User;



@Service
public class UserServiceImpl implements UserInterface{

	@Autowired
	private UserRepository userdao;
	
	public UserServiceImpl(){
	}
//	public List<User>findByUseremail(String s){
//		 List<UserLogin> c1 = (List<UserLogin>) userlogindao.findByUseremail(s);
//		 c1.forEach(e->System.out.println(e));
//		 return c1;
//	 }
	
	 public User loginUser(String useremail, String password) {
	        User user = userdao.findByUseremail(useremail);
	        if (user != null && user.getPassword().equals(password)) {
	            return user;
	        }
	        return null; 
	 }

	@Override
	public List<User> findByUseremail(String s) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	 public User saveUser(User user) {
	        return userdao.save(user);
	    }
}
