import { Component, OnInit, Pipe, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../data-types/user.data';
import { CookieService } from 'ngx-cookie-service';
import { Reservation } from '../data-types/reservation.data';
import { NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../services/reservation.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatDateRangeInput, MatDateRangePicker, MatDatepicker, MatDatepickerToggle } from '@angular/material/datepicker';


@Component({
  selector: 'app-view-reservations',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgForOf,
    TitleCasePipe,
    NgIf,
    MatFormField,
    MatLabel,
    MatDateRangeInput,
    MatDateRangePicker,
    MatDatepickerToggle
  ],
  templateUrl: './view-reservations.component.html',
  styleUrl: './view-reservations.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ViewReservationsComponent implements OnInit {

  loginForm!: FormGroup;
  email !: String;
  password !: String;
  userFound: boolean = true;
  reservations: Reservation[] = [];

  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService,
    public titlecase: TitleCasePipe, public reservationService: ReservationService) { }

  ngOnInit() {

    this.getReservations();
    const daysTag = document.querySelector(".days"),
      currentDate = document.querySelector(".current-date"),
      prevNextIcon = document.querySelectorAll(".icons span");

    let date = new Date(),
      currYear = date.getFullYear(),
      currMonth = date.getMonth();
    // storing full name of all months in array
    const months = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];
    const renderCalendar = () => {
      let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
      let liTag = "";
      for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
      }
      for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
          && currYear === new Date().getFullYear() ? "active" : "";
       if(!isToday){
        liTag += `<li _ngcontent-ng-c3958097677>${i}</li>`;
       }else{
        liTag += `<li _ngcontent-ng-c3958097677 class="${isToday}">${i}</li>`;}
      }
      for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li _ngcontent-ng-c3958097677 class="inactive">${i - lastDayofMonth + 1}</li>`
      }
      (currentDate as HTMLElement).innerText = `${months[currMonth]} ${currYear}`;
     
      daysTag!.innerHTML = liTag;
      console.log(daysTag);
    }
    renderCalendar();
    prevNextIcon.forEach(icon => { // getting prev and next icons
      icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
          // creating a new date of current year & month and pass it as date value
          date = new Date(currYear, currMonth, new Date().getDate());
          currYear = date.getFullYear(); // updating current year with new date year
          currMonth = date.getMonth(); // updating current month with new date month
        } else {
          date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
      });
    });
  }

  getReservations() {

    this.reservationService.getReservations().subscribe(
      {
        next: (data: Reservation[]) => {

          this.reservations = [...data]
        }
      });

     
  }



}

