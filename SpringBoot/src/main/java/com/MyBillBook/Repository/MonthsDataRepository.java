package com.MyBillBook.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.MyBillBook.entity.MonthsData;

public interface MonthsDataRepository extends JpaRepository<MonthsData, Integer> {

	List<MonthsData> findAllByMonthYearAndMonthNumberAndTableName(String monthYear, String monthNumber,
		String tableName);
	 void deleteByName(String name);
	
}
