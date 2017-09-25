import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Response } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role : string;
  name : string;  

  constructor(private authService : AuthService, 
    private router : Router, 
    private flashMessage : FlashMessagesService) {
    
   }

  ngOnInit() {      
    this.name = this.authService.getUser().name;
    if(this.authService.getUser().admin === 'true') {
      this.role = 'Admin';
    }
  }

  //logout
  onLogout() {
    this.authService.signOut();
    this.flashMessage.show('You are now logged out', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/']);
    return false;
  }
}
