import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import {Response} from '@angular/http';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('form') ngForm : NgForm;
  
  user = {
    email : '',
    password : ''
  };
  constructor(private authService : AuthService, private router : Router, private flashMessage : FlashMessagesService) { }

  ngOnInit() {
  }
  
  onLogin() {
    this.user.email = this.ngForm.value.email;
    this.user.password = this.ngForm.value.password;
    this.ngForm.reset();

    this.authService.login(this.user.email, this.user.password).subscribe((res : Response) => {
      if(res.status == 200) {
        const body  = res.json();
        if(body.success) {
          //save token
          this.authService.saveJwt(body.token, body.user);
          //this.flashMessage.show(body.message, { cssClass: 'alert-success', timeout: 3000 });
          //check if logged in user is admin or not
          if(body.user.admin === 'true') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/user-dashboard']);
          }          
        } else {
          this.flashMessage.show(body.message, { cssClass: 'alert-danger', timeout: 3000 });
        }
      } else {
        this.flashMessage.show('Error in login', { cssClass: 'alert-danger', timeout: 3000 });
      }
    },
    (error) => {
      this.flashMessage.show('Error in login', { cssClass: 'alert-danger', timeout: 3000 });
    });
  }

}
