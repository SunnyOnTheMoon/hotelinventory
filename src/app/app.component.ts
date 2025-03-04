import { Component, ElementRef, Inject, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { localStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  // template: `<h1>Hello World from inline template!</h1>
  // <p>Angular is Awesome</p>
  // `,
  styleUrl: './app.component.css'
  // styles: [`h1 { color: blue;} `]
})
export class AppComponent {
  title = 'hotelinventoryapp';

  // Accessing an Element with Reference
  @ViewChild('name', {static: true}) name!: ElementRef;

  // Local Storage Injected
  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorage: Storage,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
  ) { 
    console.log(initService.config);
   }

  ngOnInit() {
    // this.router.events.subscribe((event) => {
    //   console.log(event);
    // });
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ).subscribe((event) => {
      console.log('Navigation Started');
    });
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      console.log('Navigation Completed');
    });
    

    this.loggerService.Log('AppComponent.ngOnInit()');
    // this.name.nativeElement.innerText = "Hilton Hotel";

    this.localStorage.setItem('name', 'Hilton Hotel');
    // this.name.nativeElement.onmouseover = () => {
    //   console.log("Maus ist über dem Element");
      
    //   // Colorchange on div element using ElementRef
    //   let divColor = this.name.nativeElement.style.color;
    //   if(divColor === "blue"){
    //     this.name.nativeElement.style.color = "red";
    //   }
    //   else {
    //     this.name.nativeElement.style.color = "blue";
    //   }
    }


  // Template Reference Example!!
//   @ViewChild('user', {read: ViewContainerRef}) vcr! : ViewContainerRef;

//   ngAfterViewInit(){
//     const componentRef = this.vcr.createComponent(RoomsComponent);
//     componentRef.instance.numberOfRooms = 50;
//   }

//   role = 'Admin';

}