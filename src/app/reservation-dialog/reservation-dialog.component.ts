import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Destination } from '../data-types/destination.data';
import { DestinationService } from '../services/destination.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../services/notification.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatOptgroup, MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-reservation-dialog',
  standalone: true,
  imports: [MatLabel, NgIf, NgFor, MatOption, MatSelectModule, MatFormFieldModule, MatTooltipModule, MatIconModule, MatDatepickerModule, MatCardModule, MatInputModule, MatButtonModule, MatDialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.css'
})
export class ReservationDialogComponent {

  refreshEvent: EventEmitter<void> = new EventEmitter<void>();

  title: string = '';
  location: string = '';
  description: string = '';
  start_date: string = '';
  end_date: string = '';
  price: number = 0;
  selected_spots: number = 0;
  makeReservationForm!: FormGroup;
  image_name !: any;
  spots!: number[];
  total_price!: number;



  constructor(public dialogRef: MatDialogRef<ReservationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public destinationService: DestinationService, private notif: NotificationService,
    private router: Router, private snackBar: MatSnackBar, private datePipe: DatePipe) { }


  ngOnInit(): void {


    this.initForm(this.data.destination)


  }




  generateSpotsArray(availableSpots: number): number[] {
    return Array.from({ length: availableSpots }, (_, i) => i + 1);
  }
  initForm(destination: Destination) {
    this.makeReservationForm = new FormGroup({
      image_name: new FormControl(''),
      title: new FormControl(destination.title, Validators.required),
      location: new FormControl('', Validators.required),
      description: new FormControl(destination.description, Validators.required),
      price: new FormControl('', Validators.required),
      selected_spots: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
    });

    this.spots = this.generateSpotsArray(this.data.destination.available_spots);


    // Subscribe to changes in the selected_spot control
    this.makeReservationForm.get('selected_spots')?.valueChanges.subscribe((selectedSpot: number) => {
      if (selectedSpot !== null && !isNaN(selectedSpot)) {
        console.log(this.data.destination?.discount)
        if (this.data.destination?.discount != 0) { 
          
        var priceWithDiscount = this.data.destination?.price - (this.data.destination?.price * this.data.destination?.discount / 100)
        console.log(priceWithDiscount)
        this.total_price = (priceWithDiscount || 0) * selectedSpot;
      } else {
        this.total_price = (this.data.destination?.price || 0) * selectedSpot;
      }
      
      this.makeReservationForm.patchValue({ price: this.total_price });
    }
    });

  const byteCharacters = atob(destination.image_data);
  const byteNumbers = new Array(byteCharacters.length);
  for(let i = 0; i <byteCharacters.length; i++) {
  byteNumbers[i] = byteCharacters.charCodeAt(i);
}
const byteArray = new Uint8Array(byteNumbers);
const blob = new Blob([byteArray], { type: 'image/png' }); // Adjust the MIME type according to your image type


this.coverImgFile = new File([blob], destination.image_name!, { type: 'image/png' })

this.imageSelected = true;
this.showImg = URL.createObjectURL(this.coverImgFile);

console.log(destination)
this.coverImgFileName = destination.image_name!
  }




dateTimeComparisonValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const startDateTime = control.get('start_date')?.value;
    const endDateTime = control.get('end_date')?.value;

    if (startDateTime && endDateTime && startDateTime > endDateTime) {
      return { dateTimeComparison: true };
    }

    return null;
  };
}

closeDialog() {
  this.dialogRef.close();
}




showImg!: any;
coverImgFile!: File;
coverImgFileName!: string;
imageSelected: boolean = false;

onFileSelected(event: any) {


  this.coverImgFile = event.target.files[0];
  this.coverImgFileName = this.coverImgFile.name;
  this.imageSelected = true;
  this.showImg = URL.createObjectURL(event.target.files[0]);
}

  private formatDate(date: Date): string {
  if (!date) return '';
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
convertToDate(dateString: string | undefined): Date | undefined {
  if (dateString) {
    const parts = dateString.split('/');
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);


    const date = new Date(year, month - 1, day);
    return date;
  }
  return undefined;


}
onSubmit() {


  // const destination: Destination = {

  //   title: this.addDestinationForm.get('title')?.value,
  //   location: this.addDestinationForm.get('location')?.value,
  //   description: this.addDestinationForm.get('description')?.value,
  //   price: this.addDestinationForm.get('price')?.value,
  //   discount: this.addDestinationForm.get('discount')?.value,
  //   available_spots: this.addDestinationForm.get('available_spots')?.value,
  //   start_date: this.formatDate(this.addDestinationForm.get('start_date')?.value),
  //   end_date: this.formatDate(this.addDestinationForm.get('end_date')?.value)
  // };




  //   if (this.data.action === 'add') {


  //     this.destinationService.addDestination(destination, this.coverImgFile).subscribe({
  //       next: () => {
  //         this.snackBar.open('Destination successfully added', 'Close', {
  //           duration: 5000,
  //         });

  //         this.dialogRef.close();
  //         this.refreshEvent.emit();



  //       }, error: () => {

  //         this.notif.showPopupMessage("Couldn't add destination!", "OK")
  //         this.dialogRef.close();
  //         console.debug;
  //       }

  //     }

  //     );
  //   } else if (this.data.action === 'update') {

  //     destination.id = this.data.destination.id;
  //     console.log(destination)
  //     this.destinationService.updateDestination(destination, this.coverImgFile).subscribe({

  //       next: () => {


  //         this.snackBar.open('Destination successfully updated', 'Close', {
  //           duration: 5000,
  //         });
  //         this.dialogRef.close();


  //       }, error: () => {

  //         this.notif.showPopupMessage("Couldn't update destination!", "OK")
  //         console.debug;
  //         this.dialogRef.close();
  //       }
  //     }

  //     );


  //   }
}

}
