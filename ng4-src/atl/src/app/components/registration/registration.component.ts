import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import {Response} from '@angular/http';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { User } from "../../user.model";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('form') ngForm : NgForm;

  user : User;

  constructor(private authService : AuthService, private router : Router, private flashMessage : FlashMessagesService) { }

  ngOnInit() {
  }

  onRegistration() {    
    let firstName = this.ngForm.value.firstname;
    let lastName = this.ngForm.value.lastname;
    let email = this.ngForm.value.email;
    let password = this.ngForm.value.password;
    this.user = new User(firstName, lastName, email, password);
    this.ngForm.reset();

    //Register user
    this.authService.registerUser(this.user).subscribe((res : Response) => {
      if(res.status == 200) {
        const body  = res.json();
        if(body.success) {
          this.flashMessage.show(body.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/']);
        } else {
          this.flashMessage.show(body.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
      } else {
        this.flashMessage.show('Error in creating new user', { cssClass: 'alert-danger', timeout: 3000 });
      }
    },
    (error) => {
      this.flashMessage.show('Error in creating new user', { cssClass: 'alert-danger', timeout: 3000 });
    });
  }

}
