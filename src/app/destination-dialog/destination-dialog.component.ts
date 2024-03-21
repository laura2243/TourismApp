import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Destination } from '../data-types/destination.data';
import { DestinationService } from '../services/destination.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-destination-dialog',
  templateUrl: './destination-dialog.component.html',
  styleUrls: ['./destination-dialog.component.css']
})
export class DestinationDialogComponent implements OnInit {
  title: string = '';
  location: string = '';
  description: string = '';
  price: number = 0;
  discount: number = 0;
  available_spots: number = 0;
  addDestinationForm!: FormGroup;
  toUpdateDestination !: Destination;
  image !: any;

  constructor(public dialogRef: MatDialogRef<DestinationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public destinationService: DestinationService, private notif: NotificationService,
    private router: Router, private snackBar: MatSnackBar) { }


  ngOnInit(): void {

    if (this.data.action === 'add') {
      this.initForm();
    }
    else if (this.data.action === 'update') {

      this.initUpdateForm(this.data.destination);
    }

  }




  initForm() {
    this.addDestinationForm = new FormGroup({
      image: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      discount: new FormControl('', Validators.required),
      available_spots: new FormControl('', Validators.required),
    });
  }


  initUpdateForm(destination: Destination) {

    this.addDestinationForm = new FormGroup({
      image_name: new FormControl(destination.image_name, Validators.required),
      title: new FormControl(destination.title, Validators.required),
      location: new FormControl(destination.location, Validators.required),
      description: new FormControl(destination.description, Validators.required),
      price: new FormControl(destination.price, Validators.required),
      discount: new FormControl(destination.discount, Validators.required),
      available_spots: new FormControl(destination.available_spots, Validators.required),
    });


    const byteCharacters = atob(destination.image_data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {type: 'image/png'}); // Adjust the MIME type according to your image type

      // Create File object
      this.coverImgFile = new File([blob], destination.image_name!, {type: 'image/png'})
  }

  closeDialog() {
    this.dialogRef.close();
  }

  get formData() {
    return {
      title: this.title,
      location: this.location,
      description: this.description,
      price: this.price,
      discount: this.discount,
      available_spots: this.available_spots
    };
  }



  showImg !: any;
  coverImgFile!: File;
  coverImgFileName!: string;
  imageSelected: boolean = false;

  onFileSelected(event: any) {


    this.coverImgFile = event.target.files[0];
    this.coverImgFileName = this.coverImgFile.name;
    this.imageSelected = true;
    this.showImg = URL.createObjectURL(event.target.files[0]);
  }

  onSubmit() {





    const destination: Destination = {
      title: this.addDestinationForm.get('title')?.value,
      location: this.addDestinationForm.get('location')?.value,
      description: this.addDestinationForm.get('description')?.value,
      price: this.addDestinationForm.get('price')?.value,
      discount: this.addDestinationForm.get('discount')?.value,
      available_spots: this.addDestinationForm.get('available_spots')?.value
    };

    this.destinationService.addDestination(destination,this.coverImgFile).subscribe({
      next: () => {


        this.snackBar.open('Destination successfully added', 'Close', {
          duration: 5000,
        });


      }, error: () => {

        this.notif.showPopupMessage("Couldn't add destination!", "OK")
        console.debug;
      }
    }

    );
  }

}
