import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent {
  @Input() rooms: RoomList[] | null = [];

  @Input() title: string = '';

  @Input() price: number = 0;

  @Output() selectedRoom = new EventEmitter<RoomList>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }

  ngOnDestroy() {
    console.log("on destroy is called");
  }
}
