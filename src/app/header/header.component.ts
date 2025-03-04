import { Component } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'hinv-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = '';

  constructor(private configService: ConfigService) {
  }
}