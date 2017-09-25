import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { BooksService } from "../../../services/books.service";
import { MyBook } from "../../../my-book.model";
import { MdDialog } from "@angular/material";
import { BookReviewComponent } from "../../book-review/book-review.component";

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.css']
})
export class BookShelfComponent implements OnInit {
  myBooks : MyBook [] =[];

  constructor(private booksService : BooksService, public dialog: MdDialog) { }

  ngOnInit() {
    this.booksService.getMyBooks().subscribe((res : Response) => {
      if(res.status == 200) {
        let body = res.json();
        if(body.success) {     
          let books = body.books;
          books.forEach((b) => {
            this.getBookDetails(b.bookISBN, (book : any) => {
              let newBook = new MyBook(book.bookTitle, 
                book.bookAuther, 
                b.bookISBN, 
                b.issueDate, 
                b.expiryDate);
                this.myBooks.push(newBook);
            });            
          });
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

  //get book details by isbn
  getBookDetails(isbn : string, callback) {    
    this.booksService.getBookDetailsByIsbn(isbn).subscribe((res : Response) => {
      if(res.status == 200) {
        let body = res.json();
        if(body.success) {     
           let book = body.book;           
           callback(book);
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

  onReturn(index : number) {
    let myBook = this.myBooks[index];
    this.booksService.returnBook(myBook.bookISBN).subscribe((res : Response) => {
      if(res.status == 200) {
        let body = res.json();
        if(body.success) {
          this.myBooks.splice(index, 1);
        } else {

        }
      }
    },
    (err) => {

    });
  }

  onReview(index : number) {    
    let MyBook = this.myBooks[index];
    let dialog = this.dialog.open(BookReviewComponent,{
                  height: '300px',
                  width: '600px',
                  position: {top: "0px", left: "500px", bottom : '', right : '0'}
                });
    
    dialog.afterClosed()
      .subscribe(result => {
        if (result) {
          console.log(result);
          this.booksService.postReviewComment({
            'bookISBN' : MyBook.bookISBN,
            'rating' : result.starsCount,
            'comments' : result.comment
          }).subscribe((res : Response) => {
            if(res.status == 200) {
              let body = res.json();
              if(body.success) {
                console.log(body);
              } else {

              }
            }
          },
        (error) => {

        });
        } else {
          // User clicked 'Cancel' or clicked outside the dialog
        }
      });
  }

}
