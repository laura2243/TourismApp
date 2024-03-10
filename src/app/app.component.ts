import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TourismApp';
  contactForm!: FormGroup;

  @ViewChild('scrollToOffersTarget') scrollToOffersTarget!: ElementRef<HTMLElement>;
  @ViewChild('scrollToAllDestinationsTarget') scrollToAllDestinationsTarget!: ElementRef<HTMLElement>;
  @ViewChild('scrollToContactTarget') scrollToContactTarget!: ElementRef<HTMLElement>;
  @ViewChild('scrollToHomeTarget') scrollToHomeTarget!: ElementRef<HTMLElement>;
  @ViewChild('scrollToAboutUsTarget') scrollToAboutUsTarget!: ElementRef<HTMLElement>;


  constructor(private viewportScroller: ViewportScroller) {
  }



  ngOnInit(): void {
    this.initContactForm()
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

    if(this.filteredDestinations.length == 0){
      this.showTextNoDestinationFound = true;
    }else{
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
