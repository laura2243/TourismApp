import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DestinationDialogComponent } from '../destination-dialog/destination-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Destination } from '../data-types/destination.data';
import { DestinationService } from '../services/destination.service';
import { DialogService } from '../services/dialog-service.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';


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
  destinations: Destination[] = [];
  loginForm: any;

  @ViewChild('scrollToOffersTarget') scrollToOffersTarget!: ElementRef<HTMLElement>;
  @ViewChild('scrollToAllDestinationsTarget') scrollToAllDestinationsTarget!: ElementRef<HTMLElement>;
  @ViewChild('scrollToContactTarget') scrollToContactTarget!: ElementRef<HTMLElement>;
  @ViewChild('scrollToHomeTarget') scrollToHomeTarget!: ElementRef<HTMLElement>;
  @ViewChild('scrollToAboutUsTarget') scrollToAboutUsTarget!: ElementRef<HTMLElement>;


  constructor(private viewportScroller: ViewportScroller, public dialog: MatDialog, private route: ActivatedRoute,
    private destinationService: DestinationService, private dialogService: DialogService) {
  }

  openDialogUpdate(action: string, destination?: Destination): void {
    const dialogRef = this.dialog.open(DestinationDialogComponent, {
      width: '80vw',
      height: '90vh',
      panelClass: 'transparent-dialog',
      data: {
        action: action,
        destination: destination
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.destinationService.getDestinations().subscribe(
        {
          next: (data: Destination[]) => {
            this.destinations = [...data]
            console.log(this.destinations)
          }
        }
      )

    });
  }

  openDialogAdd(action: string, destination?: Destination): void {
    const dialogRef = this.dialog.open(DestinationDialogComponent, {
      width: '80vw',
      height: '90vh',
      panelClass: 'transparent-dialog',
      data: {
        action: action,
        destination: destination
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      this.destinationService.getDestinations().subscribe(
        {
          next: (data: Destination[]) => {
            this.destinations = [...data]
            console.log(this.destinations)
          }
        }
      )
      
    });
  }



  ngOnInit(): void {
    this.destinationService.getDestinations().subscribe(
      {
        next: (data: Destination[]) => {
          this.destinations = [...data]
          console.log(this.destinations)
        }
      }
    )

    this.route.queryParams.subscribe(params => {
      this.userRole = params['role'];

    });
    this.initContactForm()
  }


  isUserAdmin(): boolean {
    return this.userRole === 'admin';
  }


  initContactForm() {
    this.contactForm = new FormGroup({
      email: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
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
        return destination.location?.toLowerCase() === this.searchQuery.toLowerCase();
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



  open(destination: Destination) {
    let dialogRef = this.openDialogDeleteUser("Are you sure you want to delete this device?", false, true, false, destination)
  }

  openDialogDeleteUser(modalText: string, onLogout: boolean, onDeleteUser: boolean, onPasswordChange: boolean, destination: Destination): any {
    let dialogRef = this.dialog.open(DialogBoxComponent, {
      data: { content: modalText, onLogout: onLogout, onDeleteUser: onDeleteUser, onPasswordChange: onPasswordChange, destination: destination },
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.deleteDestination(destination)

      }
    }

    )

  }

  deleteDestination(destination: Destination) {
    this.destinationService.deleteDestination(destination.id).subscribe({
      next: () => {

        this.dialogService.openDialog("Destination deleted successfully!", false, false, true, false);
        this.destinationService.getDestinations().subscribe(
          {
            next: (data: Destination[]) => {
              this.destinations = [...data]
              console.log(this.destinations)
            }
          }
        )


      }, error: () => {

        this.dialogService.openDialog("Couldn't delete Destination!", false, false, true, false);
        console.debug;
      }
    }
    );
  }





}
