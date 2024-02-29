import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MonthNavigation } from '../Models/Models';
//import { MonthNavigation } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class TableDatasourceService {
  baseUrl = 'http://localhost:8080/api/monthsdata/';
  monthNavigationObservable = new Subject<MonthNavigation[]>();
  monthNavigationSelectedObservable = new Subject<MonthNavigation>();

  previousSavingsObservable = new Subject<{
    monthYear: string;
    monthNumber: string;
    sum: string;
  }>();
  currentSavingsRequestObservable = new Subject<{
    monthYear: string;
    monthNumber: string;
  }>();
  
  constructor(private http: HttpClient) {}

  // --------------------- BACK END REQUESTS
  getMonthList() {
    return this.http.get<any>(
      'http://localhost:8080/api/monthsdata/getlistofmonths'
    );
  }

  getTableRows(monthYear: string, monthNumber: string, tableName: string) {
    let parameters = new HttpParams();
    parameters = parameters.append('monthYear', monthYear);
    parameters = parameters.append('monthNumber', monthNumber);
    parameters = parameters.append('tableName', tableName);
    return this.http.get<any>(
    //  'http://localhost:8080/api/monthsdata/gettabledata/${monthYear}/${monthNumber}/${tableName}',
    'http://localhost:8080/api/monthsdata/gettabledata',
      {
        params: parameters,
      }
    );
  }

  postTableRow(monthDataForBackEnd: any) {
    return this.http.post(
      'http://localhost:8080/api/monthsdata/inserttablerow',
      monthDataForBackEnd,
      { responseType: 'text' }
    );
  }

 

   
  deleteTableRow(name:string)  {
    return this.http.delete(`http://localhost:8080/api/monthsdata/rows/${name}`);
  }
  

  
  editRow(id: number, rowData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/editrows/${id}`, rowData);
  }
 
//------------------------Calculation-------------------------
  
  getPreviousSavings(monthYear: string, monthNumber: string) {
    return this.http.get(`${this.baseUrl}/previous-savings?monthYear=${monthYear}&monthNumber=${monthNumber}`);
  }

  getCurrentEarnings(monthYear: string, monthNumber: string) {
    return this.http.get(`${this.baseUrl}/current-earnings?monthYear=${monthYear}&monthNumber=${monthNumber}`);
  }

  getCurrentSavings(monthYear: string, monthNumber: string) {
    return this.http.get(`${this.baseUrl}/current-savings?monthYear=${monthYear}&monthNumber=${monthNumber}`);
  }

  

  getCurrentExpenditure(monthYear: string, monthNumber: string) {
    return this.http.get(`${this.baseUrl}/current-expenditure?monthYear=${monthYear}&monthNumber=${monthNumber}`);
  }

  /*getPreviousSavings(monthYear: string, monthNumber: string) {
    return this.http.get(`${this.baseUrl}/previous-savings`, { params: { monthYear, monthNumber } });
  }

  getCurrentEarnings(monthYear: string, monthNumber: string) {
    return this.http.get(`${this.baseUrl}/current-earnings`, { params: { monthYear, monthNumber } });
  }

  getCurrentSavings(monthYear: string, monthNumber: string) {
    return this.http.get(`${this.baseUrl}/current-savings`, { params: { monthYear, monthNumber } });
  }

  getCurrentExpenditure(monthYear: string, monthNumber: string) {
    return this.http.get(`${this.baseUrl}/current-expenditure`, { params: { monthYear, monthNumber } });
  }*/

  //-----------------sumUpdated------------
  updateTransaction(transactionType: string, sum: number): Observable<any> {
    const url = `${this.baseUrl}/transactions/${transactionType}`;
    return this.http.post(url, { sum });
  }

  //-------------------setCalculation---------------
  updateCalculation(name: string, sum: string): Observable<any> {
    // Assuming your endpoint is '/update-calculation'
    const url = `${this.baseUrl}/update-calculation`;
    const body = { name, sum }; // Data to be sent in the request body

    return this.http.put(url, body);
  }

  //-------------------------getCalculation----------------
  getCalculation(name: string): Observable<number> {
    const url = `${this.baseUrl}/get-calculation/${name}`;
    return this.http.get<number>(url);
  }

  
  //---------------------------updateCurrentSavings------------------
  updateCurrentSavings(monthYear: string, monthNumber: string, sum: number): Observable<void> {
    const url = `${this.baseUrl}/update-current-savings`;
    const requestBody = { monthYear, monthNumber, sum };
    return this.http.post<void>(url, requestBody);
  }

  //--------------------addNextMonth--------------------------
  addNextMonth(): Observable<void> {
    const url = `${this.baseUrl}/add-next-month`;
    return this.http.post<void>(url, {});
  }

  //-------------------------addMonthByName--------------------
  


  getPreviousSavingsObservable(monthYear: string, monthNumber: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/previoussaving`, {
      params: {
        monthYear: monthYear,
        monthNumber: monthNumber
      }
    });
  }
}
