import { Component, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HttpEventType, HttpRequest } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {


  hotelName = 'Hilton Hotel';

  numberOfRooms: number = 10;

  hideRooms = true;

  selectedRoom!: RoomList;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  title = 'Room List';


  roomList: RoomList[] = [];

  stream = new Observable(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    observer.error('error');
  });

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  error: string = '';

  totalBytes: number = 0;

  subscription!: Subscription;

  error$ = new Subject<string>();

  rooms$: Observable<RoomList[]>;

  priceFilter = new FormControl(0);

  roomsCount$: Observable<number>;

  getError$: Observable<string>;

  constructor(@SkipSelf() private roomsService: RoomsService,
    private configService: ConfigService) {
    this.rooms$ = this.roomsService.getRooms$.pipe(
      catchError((err) => {
        console.log(err);
        this.error$.next(err.message);
        return of([]);
      })
    );

    this.getError$ = this.error$.asObservable();

    this.roomsCount$ = this.roomsService.getRooms$.pipe(
      map(rooms => rooms.length)
    );
  }

  // // @SkipSelf() decorator can be used for performance reasons
  // constructor(@SkipSelf() private roomsService: RoomsService) { }

  ngOnInit(): void {

    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Response success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }
      }
    });

    // console.log(this.headerComponent);
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('completed'),
      error: (error) => console.log(error)
    });

    this.stream.subscribe((data) => console.log(data));

    // this.roomsService.getRooms$.subscribe((rooms: RoomList[]) => {
    //   this.roomList = rooms;
    // });
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List";
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber: "4",
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: "https://media.istockphoto.com/id/600085952/de/foto/elegante-brown-couch-im-wohnbereich.jpg?s=612x612&w=0&k=20&c=yHAfO_XVIRLaD2eN66QEJZ_NNjpHubPWY25vqP-WCA0=",
      checkinTime: new Date('11-Nov-2024'),
      checkoutTime: new Date('12-Nov-2024'),
      rating: 4.5,
    };

    // this.roomList.push(room);
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: "3",
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: "https://media.istockphoto.com/id/600085952/de/foto/elegante-brown-couch-im-wohnbereich.jpg?s=612x612&w=0&k=20&c=yHAfO_XVIRLaD2eN66QEJZ_NNjpHubPWY25vqP-WCA0=",
      checkinTime: new Date('11-Nov-2024'),
      checkoutTime: new Date('12-Nov-2024'),
      rating: 4.5,
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.deleteRoom("3").subscribe((data) => {
      this.roomList = data;
    });
  }






  ngDoCheck() {
    console.log('on changes is called');
  }

  ngAfterViewInit() {
    this.headerComponent.title = "Rooms View";

    this.headerChildrenComponent.last.title = "Last Title";
    // this.headerChildrenComponent.get(0)!.title = "First Title";
  }

  ngAfterViewChecked() {
  }

  // Destroy the subscription to avoid memory leaks
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}