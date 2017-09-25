import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Response } from '@angular/http';
import { NgForm } from "@angular/forms";

import { BooksService } from "../../../services/books.service";
import { Book } from "../../../book.model";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books : Book[];
  @ViewChild('form') ngForm : NgForm;
  isEdit : boolean;
  index : number;

  bookTitle : string;
  bookAuther : string;
  bookISBN : string;
  bookQuantity : string;
  description : string;
  genre : string;

  defaultBookGenre : string;

  constructor(private booksService : BooksService) {
    this.defaultBookGenre = 'Technology';
   }

  ngOnInit() {
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

  //add new books
  onBookSubmittion() {
    let newBook = new Book(this.ngForm.value.bookTitle, 
      this.ngForm.value.bookAuther, 
      this.ngForm.value.bookISBN, 
      this.ngForm.value.bookQuantity, 
      this.ngForm.value.description,
      null);
      newBook.genre = this.ngForm.value.genre;

      //check if we are editing the book
      if(this.isEdit) {
        this.booksService.editBook(this.ngForm.value.bookQuantity, this.ngForm.value.bookISBN).subscribe((res : Response) => {
          if(res.status == 200) {
            let body = res.json();
            if(body.success) {              
              this.isEdit = false;
              let tempBook = this.books[this.index];
              tempBook.bookQuantity = this.ngForm.value.bookQuantity;
              this.books[this.index] = tempBook;
              this.ngForm.reset();
            } else {
              //error
            }
          } else {
            //error
          }
        },
        (error) => {
          //error
        });
      } else {
        this.booksService.addNewBooks(newBook).subscribe((res : Response) => {
          if(res.status == 200) {
            let body = res.json();
            if(body.success) {
              this.books.push(newBook);
              this.ngForm.reset();
              this.isEdit = false;
            } else {
              //error
            }
          } else {
            //error
          }
        },
      (error) => {
        //error
      });
    }
  }

  //edit book
  onEdit(index : number) {
    this.index = index;
    this.isEdit = true;    
    let editBook = this.books[index];
    this.bookTitle = editBook.bookTitle;
    this.bookAuther = editBook.bookAuther;
    this.bookISBN =  editBook.bookISBN;
    this.bookQuantity = editBook.bookQuantity;
    this.description = editBook.description;;
  }

  //Delete book
  onDelete(index : number) {
    let editBook = this.books[index];
    this.booksService.deleteBook(editBook.bookISBN).subscribe((res : Response) => {
      if(res.status == 200) {
        let body = res.json();
        if(body.success) {
          this.books.splice(index, 1);
        } else {
          //error
        }
      } else {
        //error
      }
    },
    (error) => {
      //error
    });
  }

}
