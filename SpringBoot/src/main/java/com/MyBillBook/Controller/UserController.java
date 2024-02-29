package com.MyBillBook.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MyBillBook.Repository.UserRepository;
import com.MyBillBook.entity.User;
import com.MyBillBook.services.UserInterface;
import com.MyBillBook.services.UserServiceImpl;

//@RestController
//@RequestMapping("/userlogin")
//@CrossOrigin(origins = "http://localhost:4200")
//public class UserLoginController {
//
//	@Autowired
//	private UserLoginDAO dao;
//    
//	@PostMapping("/login")
//	public ResponseEntity<?> Userlogin(@RequestBody UserLogin userData) {
//		System.out.println(userData);
//		UserLogin userlogin = dao.findByUseremail(userData.getUseremail());
//		if(userlogin.getPassword().equals(userData.getPassword()))
//			return ResponseEntity.ok(userlogin);
//		else
//		return (ResponseEntity<?>)ResponseEntity.internalServerError();
// }
//	
////	@Autowired
////	private UserloginInterface userloginservice;
////	@GetMapping("/login/{useremail}")
////	public List<UserLogin> findByuseremail(@PathVariable String useremail)
////	{
////		return this.findByuseremail(useremail);
////	}
//}

@RestController
//@RequestMapping("/userlogin")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	@Autowired
	private UserRepository dao;

	@Autowired
	private UserInterface userservice;

	@PostMapping("/login")
	public User loginUser(@RequestBody User user) {
		return userservice.loginUser(user.getUseremail(), user.getPassword());
	}

	@PostMapping("/signup")
	public User signUp(@RequestBody User user) {
		
		return userservice.saveUser(user);
	}
}
