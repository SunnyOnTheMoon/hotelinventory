import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'hinv-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    if(this.loginService.login(this.email, this.password)) {
      this.route.navigate(['/rooms']);
    }

  //   if(this.email === "admin@gmail.com" && this.password === "Admin") {
  //     // this.route.navigateByUrl('/rooms/add');
  //     this.route.navigate(['/rooms', 'add']);
  //   }
  }
}
