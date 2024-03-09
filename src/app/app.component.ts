import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TourismApp';

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
}
