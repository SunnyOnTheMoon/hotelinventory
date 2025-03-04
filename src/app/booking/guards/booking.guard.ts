import { CanDeactivateFn } from '@angular/router';
import { BookingComponent } from '../booking.component';

export const bookingGuard: CanDeactivateFn<BookingComponent> = (component, currentRoute, currentState, nextState) => {

  if (component.bookingForm.pristine) {
    return component.bookingForm.pristine;
  }
  else {
    component.showUnsavedChangesWarning();
    return false;
  }
};