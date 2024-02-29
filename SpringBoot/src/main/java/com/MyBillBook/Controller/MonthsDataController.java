package com.MyBillBook.Controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.MyBillBook.Repository.MonthsDataRepository;
import com.MyBillBook.entity.MonthsData;
import com.MyBillBook.services.MonthsDataService;

@RestController
@RequestMapping("/api/monthsdata")
@CrossOrigin(origins = "http://localhost:4200")
public class MonthsDataController {
	
	@Autowired
	private MonthsDataRepository monthsDataRepository;

	private final MonthsDataService monthsDataService;

	public MonthsDataController(MonthsDataService monthsDataService) {
		this.monthsDataService = monthsDataService;
	}

	

	@GetMapping()
	public List<MonthsData> getAllMonths() {
		return monthsDataRepository.findAll();
	}

	
 @GetMapping("/gettabledata")
	public ResponseEntity<List<Map<String, Object>>> getTableData1(@RequestParam String monthYear,
			@RequestParam String monthNumber, @RequestParam String tableName) {
		List<Map<String, Object>> tableData = monthsDataService.getTableData(monthYear, monthNumber, tableName);
		return new ResponseEntity<>(tableData, HttpStatus.OK);
	}

	@GetMapping("/getlistofmonths")
	public List<MonthsData> getAllMonthsData() {
		// return monthsDataRepository.findAll();
		return monthsDataRepository.findAll();
	}

	

	@GetMapping("/gettabledata/{id}")
	public ResponseEntity<MonthsData> getMonthsDataById(@PathVariable("id") Integer id) {
		Optional<MonthsData> monthsData = monthsDataRepository.findById(id);
		return monthsData.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	
	@PostMapping("/inserttablerow")

	public MonthsData createMonthsData(@RequestBody MonthsData monthsData) {
		return monthsDataRepository.save(monthsData);
	}

	@PutMapping("/editrows/{id}")
	public ResponseEntity<String> editRow(@PathVariable Integer id, @RequestBody MonthsData rowDTO) {
		Optional<MonthsData> optionalRow = monthsDataRepository.findById(id);
		if (optionalRow.isPresent()) {
			MonthsData row = optionalRow.get();
			// Update the row entity with values from rowDTO
			row.setDate(rowDTO.getDate());
			row.setName(rowDTO.getName());
			row.setAmount(rowDTO.getAmount());
			monthsDataRepository.save(row);
			return ResponseEntity.ok("Row updated successfully");
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Row not found with id: " + id);
	}

	

	 @DeleteMapping("/rows/{name}")
	 public ResponseEntity<?> deleteRowByName(@PathVariable("name") String name) {
	        boolean deleted = monthsDataService.deleteRowByName(name);
	        if (deleted) {
	            return new ResponseEntity<>(HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("Row not found", HttpStatus.NOT_FOUND);
	        }
	    }
}