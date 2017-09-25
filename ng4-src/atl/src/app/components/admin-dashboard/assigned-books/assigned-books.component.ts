import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { BooksService } from "../../../services/books.service";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-assigned-books',
  templateUrl: './assigned-books.component.html',
  styleUrls: ['./assigned-books.component.css']
})
export class AssignedBooksComponent implements OnInit {
  books : Book[] = [];
  isArrayUpdated : boolean = false;
  sortByProp : string = 'userName';
  constructor(private booksService : BooksService, private authService : AuthService) { }

  ngOnInit() {
    this.booksService.getAllAssignedBooks().subscribe((res : Response) => {
      if(res.status == 200) {
        let body = res.json();
        if(body.success) {     
          let books = body.books;
          let size = books.length;
          books.forEach((b) => {
            this.getUserDetails(b.userId, (name : any) => {
              this.getBookDetails(b.bookISBN, (bb) => {
                let newBook = new Book();
                newBook.userName = name;
                newBook.bookTitle = bb.bookTitle;
                newBook.bookAuther = bb.bookAuther;
                newBook.bookISBN = b.bookISBN;
                newBook.bookQunatity = b.quantity;
                newBook.issueDate = b.issueDate;
                newBook.expiryDate = b.expiryDate;
                this.books.push(newBook);
                if(this.books.length == size) {
                  this.isArrayUpdated = true;
                }
              });                
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

    //get user details by userid
    getUserDetails(userId : string, callback) {    
      this.authService.getUserById(userId).subscribe((res : Response) => {
        if(res.status == 200) {
          let body = res.json();
          if(body.success) {     
             let name = body.name;           
             callback(name);
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

  onSortByProp(prop : string) {
    this.sortByProp = prop;
  }
}

class Book {
  userName : string;
  bookTitle : string;
  bookAuther : string;
  bookISBN : string;
  bookQunatity : string;
  issueDate : string;
  expiryDate : string;
}