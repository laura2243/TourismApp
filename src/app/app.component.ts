import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TourismApp';
  contactForm!: FormGroup;

  @ViewChild('scrollTarget') scrollToOffersTarget!: ElementRef<HTMLElement>;
  @ViewChild('scrollToAllDestinationsTarget') scrollToAllDestinationsTarget!: ElementRef<HTMLElement>;
  @ViewChild('scrollToContactTarget') scrollToContactTarget!:  ElementRef<HTMLElement>;
  @ViewChild('scrollToHomeTarget') scrollToHomeTarget!: ElementRef<HTMLElement>;


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
    this.scrollToHomeTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start'});
  }
  scrollToOffers() {
    this.scrollToOffersTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start'});
  }
  scrollToAllDestinations() {
    this.scrollToAllDestinationsTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start'});
  }
  scrollToContact() {
    this.scrollToContactTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start'});
  }





  destinations = [
    {
      imageUrl: '../assets/cardPhoto0.jpg',
      title: 'Destination 1',
      description: 'Description for destination 1.',
      price: 100,
      availableSpots: 5
    },
    {
      imageUrl: '../assets/cardPhoto1.jpg',
      title: 'Destination 2',
      description: 'Description for destination 2.',
      price: 150,
      availableSpots: 10
    },
    {
      imageUrl: '../assets/cardPhoto.jpg',
      title: 'Destination 2',
      description: 'Description for destination 2.',
      price: 150,
      availableSpots: 10
    },
    {
      imageUrl: '../assets/cardPhoto.jpg',
      title: 'Destination 2',
      description: 'Description for destination 2.',
      price: 150,
      availableSpots: 10
    },
    {
      imageUrl: '../assets/cardPhoto.jpg',
      title: 'Destination 2',
      description: 'Description for destination 2.',
      price: 150,
      availableSpots: 10
    },

  ];


  offerDestinations = [
    {
      imageUrl: '../assets/cardPhoto.jpg',
      title: 'Destination 1',
      description: 'Description for destination 1.',
      price: 100,
      availableSpots: 5
    },
    {
      imageUrl: '../assets/cardPhoto.jpg',
      title: 'Destination 2',
      description: 'Description for destination 2.',
      price: 150,
      availableSpots: 10
    },
    {
      imageUrl: '../assets/cardPhoto.jpg',
      title: 'Destination 2',
      description: 'Description for destination 2.',
      price: 150,
      availableSpots: 10
    },
    {
      imageUrl: '../assets/cardPhoto.jpg',
      title: 'Destination 2',
      description: 'Description for destination 2.',
      price: 150,
      availableSpots: 10
    },
    {
      imageUrl: '../assets/cardPhoto.jpg',
      title: 'Destination 2',
      description: 'Description for destination 2.',
      price: 150,
      availableSpots: 10
    },

  ];
  loginForm: any;
}
