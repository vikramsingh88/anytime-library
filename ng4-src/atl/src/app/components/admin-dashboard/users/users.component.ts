import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users : any;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authService.getAllNonAdminusers().subscribe((res : Response) => {
      if(res.status == 200) {
        let body = res.json();
        if(body.success) {
          this.users = body.users;          
        }
      } else {

      }
    },
    (error) => {
      
    });
  }

  onDelete(index : number) {
    
  }

}
