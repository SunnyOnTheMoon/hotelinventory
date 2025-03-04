import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'hinv-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrl: './rooms-booking.component.css'
})
export class RoomsBookingComponent {

  id: string = '';

  id$: Observable<string| null>;

  constructor(private router: ActivatedRoute) {
    // Will get the id from the URL, updating the value
    this.id$ = this.router.paramMap.pipe(
      map(params => params.get('id')));

  }

  ngOnInit(): void {
    // // Will get the id from the URL, not updating the value
    // this.id = this.router.snapshot.params['id'];


    // For Multiple Values in the URL
    this.router.paramMap.subscribe((params) => {
      params.get('id');
    });
    // // Will get the id from the URL, updating the value but subscribing every time the value changes
    // this.router.params.subscribe((params) => {
    //   if(params['id']){
    //     this.id = params['id'];
    //   }
    // });
  }
}
