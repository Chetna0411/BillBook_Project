package com.MyBillBook.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.MyBillBook.Exception.DataNotFoundException;
import com.MyBillBook.Repository.MonthsDataRepository;
import com.MyBillBook.entity.MonthsData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;

@Service
public class MonthsDataService {

	private final MonthsDataRepository monthsDataRepository;
	private final ObjectMapper objectMapper; // ObjectMapper for JSON serialization

	public MonthsDataService(MonthsDataRepository monthsDataRepository, ObjectMapper objectMapper) {
		this.monthsDataRepository = monthsDataRepository;
		this.objectMapper = objectMapper;

	}

	public ResponseEntity<String> fetchTableRows(String monthYear, String monthNumber, String tableName) {
		List<MonthsData> rows = monthsDataRepository.findAllByMonthYearAndMonthNumberAndTableName(monthYear,
				monthNumber, tableName);

		try {
			String json = objectMapper.writeValueAsString(rows);

			return ResponseEntity.ok().contentType(org.springframework.http.MediaType.APPLICATION_JSON).body(json);
		} catch (JsonProcessingException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while processing data");
		}
	}

	public List<MonthsData> getAllMonths() {
		return monthsDataRepository.findAll();
	}

	public List<MonthsData> getMonthsData() {
		return monthsDataRepository.findAll();
	}

	public MonthsData getMonthsDataById(Integer id) {
		return monthsDataRepository.findById(id)
				.orElseThrow(() -> new DataNotFoundException("MonthsData not found with id " + id));
	}

	public MonthsData createMonthsData(MonthsData monthsData) {
		return monthsDataRepository.save(monthsData);
	}

	public MonthsData updateMonthsData(Integer id, MonthsData newMonthsData) {
		return monthsDataRepository.findById(id).map(existingData -> {
			newMonthsData.setId(existingData.getId());
			return monthsDataRepository.save(newMonthsData);
		}).orElseThrow(() -> new DataNotFoundException("MonthsData not found with id " + id));
	}

	public void deleteMonthsData(Integer id) {
		if (!monthsDataRepository.existsById(id)) {
			throw new DataNotFoundException("MonthsData not found with id " + id);
		}
		monthsDataRepository.deleteById(id);
	}

	@Transactional
	public boolean deleteRowByName(String name) {
		try {
			monthsDataRepository.deleteByName(name);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public boolean editRow(Integer id, MonthsData rowDTO) {
		Optional<MonthsData> optionalRow = monthsDataRepository.findById(id);
		if (optionalRow.isPresent()) {
			MonthsData row = optionalRow.get();
			// Update the row entity with values from rowDTO
			row.setDate(rowDTO.getDate());
			row.setName(rowDTO.getName());
			row.setAmount(rowDTO.getAmount());
			monthsDataRepository.save(row);
			return true;
		}
		return false;
	}

	public List<Map<String, Object>> getTableData(String monthYear, String monthNumber, String tableName) {
		List<Map<String, Object>> tableData = new ArrayList<>();
		List<MonthsData> monthsDataList = monthsDataRepository.findAllByMonthYearAndMonthNumberAndTableName(monthYear,
				monthNumber, tableName);

		for (MonthsData x : monthsDataList) {
			Map<String, Object> data = new HashMap<>();
			data.put("date", x.getDate());
			data.put("name", x.getName());
			data.put("amount", x.getAmount());
			tableData.add(data);
		}

		return tableData;
	}

}