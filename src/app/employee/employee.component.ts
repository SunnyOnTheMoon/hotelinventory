import { Component, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  // // // Second Instance of a Servide (normally not used)
  // providers: [RoomsService]
})
export class EmployeeComponent {

  empName: String = "John";

  // @Self decorator to restrict the Service on that Component
  constructor(private roomsService: RoomsService) { }

}
