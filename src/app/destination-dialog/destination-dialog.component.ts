import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
  availableSpots: number = 0;
  addDestinationForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DestinationDialogComponent>) { }


  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addDestinationForm = new FormGroup({
      title: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      discount: new FormControl('', Validators.required),
      availableSpots: new FormControl('', Validators.required),
    });
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
      availableSpots: this.availableSpots
    };
  }
}
