import { Component, OnInit } from '@angular/core';

import { BooksService } from "../../services/books.service";
import { Book } from "../../book.model";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  
  constructor(private booksService : BooksService) { }

  ngOnInit() {

  }
}
