package com.MyBillBook.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.MyBillBook.entity.User;




@Repository
public interface UserRepository extends JpaRepository<User,String>{
	  User findByUseremail(String useremail);
}

//public interface UserDAO extends JpaRepository<User,String>{
//
//	
//
//	User findByUseremail(Object useremail);
//
//	Object getUseremail();
//
//}
