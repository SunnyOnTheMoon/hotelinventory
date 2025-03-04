import { Component, ContentChild, Host, Inject } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
  // providers: [RoomsService]
})
export class ContainerComponent {

  // Accessing Properties with ContentChild, most of the time use InputBinding
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  //Will only look for a provider here because of @Host()
  // constructor(@Host() @Inject(RoomsService) private roomsService: RoomsService) {}

  constructor() {}

  ngAfterContentInit(): void {
    console.log(this.employee);
    this.employee.empName = "Sunny";
  }
}
