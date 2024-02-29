package com.MyBillBook.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//@Entity
//@Table(name="Login_User")
//@AllArgsConstructor
//@Data
//@NoArgsConstructor
//public class User {
// 
//	@Id
//	private String useremail;
//	private String password;
//	public String getUseremail() {
//		return useremail;
//	}
//	public void setUseremail(String useremail) {
//		this.useremail = useremail;
//	}
//	public String getPassword() {
//		return password;
//	}
//	public void setPassword(String password) {
//		this.password = password;
//	}


@Entity
@Table(name="Login_User")
public class User {
    @Id
    private String useremail;
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mobileno;
    private String username;
	private String password;
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	public User(String useremail, Long mobileno, String username, String password) {
		super();
		this.useremail = useremail;
		this.mobileno = mobileno;
		this.username = username;
		this.password = password;
	}
	@Override
	public String toString() {
		return "User [useremail=" + useremail + ", mobileno=" + mobileno + ", username=" + username + ", password="
				+ password + "]";
	}
	public String getUseremail() {
		return useremail;
	}
	public void setUseremail(String useremail) {
		this.useremail = useremail;
	}
	public Long getMobileno() {
		return mobileno;
	}
	public void setMobileno(Long mobileno) {
		this.mobileno = mobileno;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
  
   

}
