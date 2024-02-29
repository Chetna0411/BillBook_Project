

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
//import { Table, TableRow } from '../models/models';
import { TableDatasourceService } from '../services/table-datasource.service';
import { Table, TableRow } from '../Models/Models';
import { Observable, ObservableInput, forkJoin, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TableComponent implements OnInit {
  month: any = {};//added
  @Input() table: Table;
  @Input() monthNumber: string;
  @Input() monthYear: string;
  @Output() sumUpdated = new EventEmitter<number>();

  addRowForm: FormGroup;

  constructor(public datasource: TableDatasourceService) {
    this.table = {
      tableName: '',
      columns: [],
      rows: [],
      isSaved: false,
    };
    this.addRowForm = new FormGroup({});
    this.monthNumber = '';
    this.monthYear = '';
  }

  /*ngOnInit(): void {
    // Getting all the Rows of this table when this table is Initialized.
    this.datasource
      .getTableRows(this.monthYear, this.monthNummber, this.table.tableName)
      .subscribe((res) => {
        this.table.rows = [];
        for (let row of res) {
          this.addRowToArray(row.id, row.date, row.name, row.amount, true);
        }
      });*/

      ngOnInit(): void {
        
        this.datasource
          .getTableRows(this.monthYear, this.monthNumber, this.table.tableName)
          .subscribe((res) => {
            this.table.rows = res;
          });

    this.addRowForm = new FormGroup({
      date: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        daysInMonthValidator(this.monthYear, this.monthNumber),
      ]),
      name: new FormControl('', [Validators.required]),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
    });
  }

  addNewRow() {
    let date = this.dateControl.value;
    let name = this.nameControl.value;
    let amount = this.amountControl.value;

    let monthDataForBackEnd = {
      monthYear: this.monthYear,
      monthNumber: this.monthNumber,
      tableName: this.table.tableName,
      date: date,
      name: name,
      amount: amount,
    };

    /*this.datasource.postTableRow(monthDataForBackEnd).subscribe((res) => {
      this.addRowToArray(parseInt(res), date, name, amount, true);
    });*/

    this.datasource.postTableRow(monthDataForBackEnd).subscribe((res) => {
      this.table.rows.push({
        id: parseInt(res),
        date: date,
        name: name,
        amount: amount,
        isSaved: true,
      });
      this.updateTheSum();
      this.clearForm();
    });
  }

  addRowToArray(
    id: number,
    date: string,
    name: string,
    amount: string,
    isSaved: boolean
  ) {
    let row: TableRow = {
      id: id,
      date: date,
      name: name,
      amount: amount,
      isSaved: isSaved,
    };
    this.table.rows.push(row);
    this.updateTheSum();
    this.clearForm();
   
  }

  editRow(name:string) {
    if (
      this.dateControl.value === '' &&
      this.nameControl.value === '' &&
      this.amountControl.value === ''
    ) {
      this.table.rows.forEach((row, index) => {
        if (name && row.name === name) {
          this.deleteRow(row.name);
          this.dateControl.setValue(row.date);
          this.nameControl.setValue(row.name);
          this.amountControl.setValue(row.amount);
          
        }
      });
    } else {
      alert('First Add pending Row Data');
    }
  }

 /* editRow(id: any){
    console.log(id);
    {
      //this.table.rows.forEach((row, index) => {
      this.table.rows.forEach((row) => {
        if (id && row.id === id) {
          this.deleteRow(row.id);
          this.dateControl.setValue(row.date);
          this.nameControl.setValue(row.name);
          this.amountControl.setValue(row.amount);
          this.month.getMonthList();
        }
   
  });
}
  }
  */
 /* editRow(id:any){
   
      this.table.rows.forEach((row, index) => {
     // this.table.rows.forEach((row) => {
        if (row.id === id) {
          //this.deleteRow(row.id);
          this.dateControl.setValue(row.date);
          this.nameControl.setValue(row.name);
          this.amountControl.setValue(row.amount);
          //this.month.getMonthList();
        }
       
  });
  console.log(id);
}
*/
/*deleteRow(id: number | undefined) {
  this.table.rows.forEach((row, index) => {
    if (id && row.id === id) {
      this.datasource.deleteTableRow(row.id).subscribe((res) => {
        this.table.rows.splice(index, 1);
      });
    }
  });
}
*/
/*
 deleteRow(id: any){
  console.log(id);
  this.table.rows.forEach((item, index) =>{
     if(item.id === id){
  this.datasource.deleteTableRow(id).subscribe(
    (res)=>{
      this.table.rows.splice(index, 1);
      //this.ngOnInit();
    }
  );
}
  });
}
*/
/*deleteRow(id: any){
this.datasource.deleteTableRow(id).subscribe(
  (res)=>{
    if(id==id)
    this.updateTheSum();
  })
};
*/

 /*deleteRow(id: number) {
    
  this.table.rows.forEach((row, index) => {
     
      if (row.id == id) {
        this.datasource.deleteTableRow(row.id).subscribe(
          () => {
            this.table.rows.splice(index, 1);
            
            this.month.getMonthList();
            this.updateTheSum();
          },
          (error) => {
            console.error('Error deleting row:', error);
            // Handle the error as needed (e.g., show a message to the user)
          }
        );
      }
    });
  }
  */
  
  deleteRow(name: string) {
    console.log("delete success",name)
    this.datasource.deleteTableRow(name)
      .subscribe(
        {next:(res: any) => {
          console.log('Row deleted:', res);
          // Remove the respective recipe from this.recipes if needed
        },
        error:(error: any) => {
          console.error('Error deleting row:', error);
        }}
      );
  }
  /*deleteRow(id: any) {
    this.table.rows.forEach((row, index) => {
      console.log(id);
      if (row.id == id) {
        this.datasource.deleteTableRow(row.id).subscribe(
          () => {
            this.table.rows.splice(index, 1);
            
            this.month.getMonthList();
            this.updateTheSum();
          },
          (error) => {
            console.error('Error deleting row:', error);
            // Handle the error as needed (e.g., show a message to the user)
          }
        );
      }
    });
  }
*/

/*
  deleteTableRow(id:any): Observable<any> {
    console.log(`Deleting row with ID: ${id}`);
    return new Observable((observer) => {
        observer.next({ success: true });
        observer.complete();
        this.clearForm();
       
    });
}
*/
/*deleteTableRow(id:number): Observable<any> {
  console.log(`Deleting row with ID: ${id}`);
  return new Observable((observer) => {
      observer.next({ success: true });
      setTimeout(() => {
      observer.complete();
      observer.complete();
      this.clearForm();
    }, 1000); 
     
  });
}
*/

  clearForm() {
    this.dateControl.setValue('');
    this.nameControl.setValue('');
    this.amountControl.setValue('');
  }

  updateTheSum() {
    let sum = 0;
    this.table.rows.forEach((row, index) => {
      sum += parseInt(row.amount);
    });
    this.sumUpdated.emit(sum);
  }

  // GETTERS TO ACCESS FORM ELEMENTS AND FORM ITSELF------------
  public get dateControl(): FormControl {
    return this.addRowForm.controls['date'] as FormControl;
  }

  public get nameControl(): FormControl {
    return this.addRowForm.controls['name'] as FormControl;
  }

  public get amountControl(): FormControl {
    return this.addRowForm.controls['amount'] as FormControl;
  }

  public get RowForm() {
    return this.addRowForm as FormGroup;
  }
  // ------------------------------------------------------------
}

// Validator Function to Check Number of Days in given month

function daysInMonthValidator(
  monthYear: string,
  monthNumber: string
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (
      parseInt(control.value) < 1 ||
      parseInt(control.value) > getDaysInMonth(monthYear, monthNumber)
    ) {
      return { daysInvalid: true };
    }
    return null;
  };
}

function getDaysInMonth(monthYear: string, monthNumber: string): number {
  return new Date(parseInt(monthYear), parseInt(monthNumber), 0).getDate();
}