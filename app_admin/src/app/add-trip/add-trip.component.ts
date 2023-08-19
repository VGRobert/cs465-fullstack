import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})

export class AddTripComponent implements OnInit {

  addForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null; // Reset the error message

    if (this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value)
        .then(data => {
          console.log(data);
          this.router.navigate(['']);
          this.addForm.reset(); // Reset the form
        })
        .catch(error => {
          console.error("Error adding trip:", error);
          this.errorMessage = "Error adding trip.";
        });
    } else {
      this.errorMessage = "Please fill in all the required fields correctly.";
    }
  }

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }
}
