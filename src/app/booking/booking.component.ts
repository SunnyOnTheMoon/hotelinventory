import { Component } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    const roomId = this.route.snapshot.paramMap.get('roomid');
    this.bookingForm = this.fb.group({
      roomId: new FormControl(
        { value: roomId, disabled: true },
        {
          validators: [
            Validators.required,
          ]
        }
      ),
      // blur will trigger validation on blur wich means when the user leaves the field
      guestEmail: ['', { updateOn: 'blur', validators: [Validators.required, Validators.email] }],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: ['', { updateOn: 'blur' }],
      guestName: ['', [
        Validators.required, Validators.minLength(5),
        CustomValidator.validateName, CustomValidator.validateSpecialChar('*')]],
      address: this.fb.group({
        addressLineOne: ['', [Validators.required]],
        addressLineTwo: [''],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zipCode: ['']
      }),
      questCount: [''],
      guests: this.fb.array([this.addGuestControl()]),
      tnc: new FormControl(false, Validators.requiredTrue),
    },
      {
        // This makes 'blur' be used for all fields
        // change and submit are the other options and do the following: change triggers validation on every change, submit triggers validation on submit
        updateOn: 'blur',
        validators: [CustomValidator.validateDate]
      }
    );


    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe((value) => {
    //   this.bookingService.bookRoom(value).subscribe((data) => {

    //   })
    // });

    // this.bookingForm.valueChanges.pipe(
    //   exhaustMap((data) => this.bookingService.bookRoom(data))
    // ).subscribe((data) => {
    //   console.log(data);
    // });
  }

  addBooking() {

    this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((response) => {
      console.log(response);
    });

    // Gets everything even the disabled fields
    // console.log(this.bookingForm.getRawValue());

    this.bookingForm.reset({
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLineOne: '',
        addressLineTwo: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
      },
      questCount: '',
      guests: [],
      tnc: false,
    });

  }

  getBookingData() {
    // setValue excepts every field to be present, patchValue does not
    this.bookingForm.patchValue({
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('28-Mar-2025'),
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLineOne: '',
        addressLineTwo: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
      },
      questCount: '',
      guests: [],
      tnc: false,
    });
  }

  addGuest() {
    this.guests.push(this.addGuestControl());
  }

  addGuestControl() {
    return this.fb.group({ name: ['', [Validators.required]], age: new FormControl('') });
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }

  removeGuest(i: number) {
    this.guests.removeAt(i);
  }

  showUnsavedChangesWarning() {
    this._snackBar.open('You have unsaved changges!', 'Close');
  }
}

// export class Booking {
//   roomId: string;
//   guestEmail: string;
//   checkinDate: Date;
//   checkoutDate: Date;
//   bookingStatus: string;
//   bookingAmount: number;
//   bookingDate: Date;
//   mobileNumber: String;
//   guestName: string;
//   guestAddress: string;
//   guestCity: string;
//   guestState: string;
//   guestCountry: string;
//   guestZipCode: string;
//   questCount: number;
//   guestList: Guest[];
// }