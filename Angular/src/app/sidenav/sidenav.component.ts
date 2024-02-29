

import { Component, OnInit } from '@angular/core';
//import { MonthNavigation } from '../models/models';
import { TableDatasourceService } from '../services/table-datasource.service';
import { MonthNavigation } from '../Models/Models';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SideNavComponent implements OnInit {
  navigationList: MonthNavigation[];

  constructor(public datasource: TableDatasourceService) {
    this.navigationList = [];
  }

  ngOnInit(): void {
    this.datasource.monthNavigationObservable.subscribe((res) => {
      this.navigationList = res;
    });
  }

  newMonthNavigationClicked(event:any) {
    let monthNavigation: MonthNavigation = {
      monthYear: event.monthYear,
      monthNumber: event.monthNumber,
    };
    this.datasource.monthNavigationSelectedObservable.next(monthNavigation);
  }
}

