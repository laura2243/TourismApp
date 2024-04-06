import { Component, OnInit, Pipe, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../data-types/user.data';
import { CookieService } from 'ngx-cookie-service';
import { Reservation } from '../data-types/reservation.data';
import { NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../services/reservation.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatDateRangeInput, MatDateRangePicker, MatDatepicker, MatDatepickerToggle } from '@angular/material/datepicker';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  NgApexchartsModule,
  ApexFill
} from "ng-apexcharts";
import { Destination } from '../data-types/destination.data';

export type ChartOptions = {
  colors: any,
  fill: ApexFill,
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

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
    MatDatepickerToggle,
    NgApexchartsModule
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
  destinationId!: string;
  destinationName!: string;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService,
    public titlecase: TitleCasePipe, public reservationService: ReservationService, private route: ActivatedRoute) {




  }
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.destinationId = params['destinationId'];
      this.destinationName = params['destinationName'];

    });



    // this.getReservations();

    this.reservationService.getReservationsByDestinationId(this.destinationId).subscribe(
      {
        next: (data: Reservation[]) => {

          this.reservations = [...data]

          this.renderCalendarComponent();
          this.renderStatisticsComponent();


        }
      });


  }




  renderStatisticsComponent() {
    this.chartOptions = {


      fill: {
        type: "gradient",
        colors: ["rgb(23, 82, 46)"],
        gradient: {
          shade: 'dark',
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: ["rgb(23, 82, 46)"],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0.4,

        }
      },
      colors: [" rgb(23, 82, 46)"],

      series: [
        {
          name: "Reservation",
          data: [31, 40, 28, 51, 42, 109, 100],


        }
      ],

      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "category",
        categories: ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]
      },


      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      },

    };
    this.chartOptions.fill = this.chartOptions.fill as ApexFill;
  }

  public generateData(baseval: any, count: any, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  renderCalendarComponent() {

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

      const daysSet: { [key: number]: number } = {}


      this.reservations.forEach(reservation => {
        const startDateString = reservation.start_date;
        const endDateString = reservation.end_date;

        if (startDateString && endDateString) {
          const startDate = new Date(startDateString);
          const endDate = new Date(endDateString);

          const startMonth = startDate.getMonth();
          const endMonth = endDate.getMonth();


          for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            if (currMonth === startMonth || currMonth === endMonth) {



              daysSet.add(date.getDate());
              liTag += `<li _ngcontent-ng-c3958097677 class="active">${date.getDate()}</li>`;
            }
          }
        }
      });


      for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        const daysArray = Array.from(daysSet);
        console.log(daysArray)
        if (daysArray.includes(i) && (currMonth === startMonth || currMonth === endMonth)) {
          liTag += `<li _ngcontent-ng-c3958097677 class="active">${i}</li>`
        } else {
          liTag += `<li _ngcontent-ng-c3958097677 >${i}</li>`

        }

      }


      for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days

        liTag += `<li _ngcontent-ng-c3958097677 class="inactive">${i - lastDayofMonth + 1}</li>`

      }
      (currentDate as HTMLElement).innerText = `${months[currMonth]} ${currYear}`;

      daysTag!.innerHTML = liTag;

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




}

