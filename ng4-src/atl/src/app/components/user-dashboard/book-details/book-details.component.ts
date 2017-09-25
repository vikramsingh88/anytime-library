import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Params } from "@angular/router";

import { BooksService } from "../../../services/books.service";
import { Book } from "../../../book.model";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book : Book;
  comments : any;
  constructor(private bookService : BooksService, private route : ActivatedRoute) { }

  ngOnInit() {    
    this.route.params.subscribe((params : Params) => {
      this.getBookDetailsByISBN(params['isbn'])
      this.getBookReviews(params['isbn']);
    });    
  }

  getBookReviews(bookIsbn : string) {
    this.bookService.getBookReviewByISBN(bookIsbn).subscribe((res : Response) => {
      if(res.status == 200) {
        let body = res.json();
        if(body.success) {
          this.comments = body.comments;
        }
      }
    },
    (error) => {

    });
  }

  //get book detail by ISBN
  getBookDetailsByISBN(bookIsbn) {
    this.bookService.getBookDetailsByIsbn(bookIsbn).subscribe((res : Response) => {
      if(res.status == 200) {
        let body = res.json();
        if(body.success) {
          this.book = body.book;
        }
      }
    },
    (error) => {

    });
  }

}
