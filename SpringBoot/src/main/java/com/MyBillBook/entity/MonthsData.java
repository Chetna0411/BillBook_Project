package com.MyBillBook.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

	@Entity
	@Table(name = "MonthsData")
	public class MonthsData {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;

	    @JsonProperty("monthYear")
	    
		@Column(name = "MonthYear")
	    private String monthYear;

	    @JsonProperty("monthNumber")
	    @Column(name = "MonthNumber")
	    private String monthNumber;

	    @JsonProperty("tableName")
	    
	    @Column(name = "TableName")
	    private String tableName;

	    @Column(name = "Date")
	    private String date;

	    @Column(name = "Name")
	    private String name;

	    @Column(name = "Amount")
	    private String amount;
	    
	    public MonthsData() {
	    }

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public String getMonthYear() {
			return monthYear;
		}

		public void setMonthYear(String monthYear) {
			this.monthYear = monthYear;
		}

		public String getMonthNumber() {
			return monthNumber;
		}

		public void setMonthNumber(String monthNumber) {
			this.monthNumber = monthNumber;
		}

		public String getTableName() {
			return tableName;
		}

		public void setTableName(String tableName) {
			this.tableName = tableName;
		}

		public String getDate() {
			return date;
		}

		public void setDate(String date) {
			this.date = date;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getAmount() {
			return amount;
		}

		public void setAmount(String amount) {
			this.amount = amount;
		}

		public MonthsData(String monthYear, String monthNumber, String tableName) {
			// TODO Auto-generated constructor stub
			this.monthYear = monthYear;
			this.monthNumber = monthNumber;
			this.tableName = tableName;
		}
	}

		
	  