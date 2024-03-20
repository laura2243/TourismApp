import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DestinationDialogComponent } from '../destination-dialog/destination-dialog.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  title = 'TourismApp';
  contactForm!: FormGroup;
  email!: any;
  content!: any;
  userRole!: any;

  @ViewChild('scrollToOffersTarget') scrollToOffersTarget!: ElementRef<HTMLElement>;
  @ViewChild('scrollToAllDestinationsTarget') scrollToAllDestinationsTarget!: ElementRef<HTMLElement>;
  @ViewChild('scrollToContactTarget') scrollToContactTarget!: ElementRef<HTMLElement>;
  @ViewChild('scrollToHomeTarget') scrollToHomeTarget!: ElementRef<HTMLElement>;
  @ViewChild('scrollToAboutUsTarget') scrollToAboutUsTarget!: ElementRef<HTMLElement>;


  constructor(private viewportScroller: ViewportScroller, public dialog: MatDialog, private route: ActivatedRoute) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DestinationDialogComponent, {
      width: '60%',
      height: '100%',
      panelClass: 'transparent-dialog', // CSS class for transparent background
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Here you can handle the form data, e.g., submit it to a service
    });
  }



  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
       this.userRole = params['role'];
      // Now you can use userRole in this component
    });
    this.initContactForm()
  }


  isUserAdmin(): boolean {
   
    return this.userRole === 'ADMIN';
  }


  initContactForm() {
    this.contactForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  scrollToHome() {
    this.scrollToHomeTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  scrollToAboutUs() {
    this.scrollToAboutUsTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  scrollToOffers() {
    this.scrollToOffersTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  scrollToAllDestinations() {
    this.searchedDestination = false;
    this.scrollToAllDestinationsTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  scrollToAllDestinationsFromSearch() {
    this.scrollToAllDestinationsTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  scrollToContact() {
    this.scrollToContactTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }



  filteredDestinations: any[] = [];
  searchQuery: string = '';
  searchedDestination: boolean = false;
  showTextNoDestinationFound: boolean = false;

  filterDestinations() {
    if (!this.searchQuery) {
      this.filteredDestinations = this.destinations;
    } else {
      this.filteredDestinations = this.destinations.filter(destination => {
        return destination.location.toLowerCase() === this.searchQuery.toLowerCase();
      });
    }

    if (this.filteredDestinations.length == 0) {
      this.showTextNoDestinationFound = true;
    } else {
      this.showTextNoDestinationFound = false;
    }
    this.searchedDestination = true;
    this.scrollToAllDestinationsFromSearch()
  }


  destinations = [
    {
      imageUrl: '../assets/cardPhoto0.jpg',
      title: 'Destination 1',
      description: 'Description for destination 1.',
      location: 'Here',
      price: 100,
      availableSpots: 5
    },
    {
      imageUrl: '../assets/cardPhoto1.jpg',
      title: 'Destination 2',
      description: 'Description for destination 2.',
      location: 'Location for destination 1.',
      price: 150,
      availableSpots: 10
    },
    {
      imageUrl: '../assets/cardPhoto.jpg',
      title: 'Destination 2',
      description: 'Description for destination 2.',
      location: 'Location for destination 1.',
      price: 150,
      availableSpots: 10
    },
    {
      imageUrl: '../assets/cardPhoto.jpg',
      title: 'Destination 2',
      description: 'Description for destination 2.',
      location: 'Location for destination 1.',
      price: 150,
      availableSpots: 10
    },
    {
      imageUrl: '../assets/cardPhoto.jpg',
      title: 'Destination 2',
      description: 'Description for destination 2.',
      location: 'Location for destination 1.',
      price: 150,
      availableSpots: 10
    },

  ];


  offerDestinations = [
    {
      imageUrl: '../assets/cardPhoto.jpg',
      title: 'Destination 1',
      description: 'Description for destination 1.',
      date: '12.03.2024 - 20.03.2024',
      location: 'Location for destination 1.',
      price: 100,
      availableSpots: 5
    },
    {
      imageUrl: '../assets/cardPhoto.jpg',
      title: 'Destination 2',
      description: 'Description for destination 2.',
      date: '12.03.2024 - 20.03.2024',
      location: 'Location for destination 1.',
      price: 150,
      availableSpots: 10
    },
    {
      imageUrl: '../assets/cardPhoto.jpg',
      title: 'Destination 2',
      description: 'Description for destination 2.',
      date: '12.03.2024 - 20.03.2024',
      location: 'Location for destination 1.',
      price: 150,
      availableSpots: 10
    },
    {
      imageUrl: '../assets/cardPhoto.jpg',
      title: 'Destination 2',
      description: 'Description for destination 2.',
      date: '12.03.2024 - 20.03.2024',
      location: 'Location for destination 1.',
      price: 150,
      availableSpots: 10
    },
    {
      imageUrl: '../assets/cardPhoto.jpg',
      title: 'Destination 2',
      description: 'Description for destination 2.',
      date: '12.03.2024 - 20.03.2024',
      location: 'Location for destination 1.',
      price: 150,
      availableSpots: 10
    },

  ];
  loginForm: any;

}
