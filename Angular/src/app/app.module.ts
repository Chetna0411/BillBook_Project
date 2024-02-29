import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './sidenav/sidenav.component';
import { MonthsComponent } from './months/months.component';
import { MonthComponent } from './month/month.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './tables/tables.component';
import { HttpClientModule} from '@angular/common/http';
import { NumberToMonthPipe } from './Pipes/numbers-to-month.pipe';
import { MonthToNumberPipe } from './Pipes/month-to-number.pipe';
import { TableDatasourceService } from './services/table-datasource.service';

//import {HttpFormModule } from ''
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    MonthsComponent,
    MonthComponent,
    TableComponent,
    NumberToMonthPipe,
    MonthToNumberPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

//HttpFormModule

  ],
  //providers: [],
  providers: [
    TableDatasourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HomeExpenseManager';
  menuButtonStatus: boolean = true;
}*/