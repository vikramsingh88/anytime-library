import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from "@angular/router";

import { BooksService } from "../../../services/books.service";
import { Book } from "../../../book.model";

@Component({
  selector: 'app-book-library',
  templateUrl: './book-library.component.html',
  styleUrls: ['./book-library.component.css']
})
export class BookLibraryComponent implements OnInit {
  books : Book[];
  searchBy : string = 'Technology';

  constructor(private booksService : BooksService, private router : Router, private route :ActivatedRoute) { }

  ngOnInit() {
    this.getBooks();
  }

  //get books
  getBooks() {
    this.booksService.getBooks().subscribe((res : Response) => {
      if(res.status == 200) {
        let body = res.json();
        if(body.success) {
          this.books = body.books;          
        } else {
          //error
        }
      } else {
        //error
      }
    },
    (error) => {

    });
  }

  //Issue book
  onAssigned(index : number) {
    let book = this.books[index];
    this.booksService.issueBook(book.bookISBN, 1).subscribe((res : Response) => {
      if(res.status == 200) {
        let body = res.json();
        if(body.success) {
          console.log('book assigned');    
          this.getBooks();   
        } else {
          console.log('error');    
        }
      } else {
        console.log('error');    
      }
    },
    (error) => {
      console.log(error);    
    });
  }

  //Get book details and review comments
  onDetails(index : number) {
    let book = this.books[index];
    this.router.navigate(['../book-details', book.bookISBN], {relativeTo : this.route});
    this.booksService.setBook(book);
  }

  //on select by search
  onSelect(searchBy : string) {
    this.searchBy = searchBy;
  }

  // search
  onSearch(searchKey : string) {
    this.booksService.searchBook(this.searchBy, searchKey).subscribe((res : Response) => {
      if(res.status == 200) {
        let body = res.json();
        if(body.success) {
          this.books = body.books;
        }
      }
    },
    (error) => {

    });
  }

}
 