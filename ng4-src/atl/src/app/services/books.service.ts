import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subject } from "rxjs/Subject";
import { Book } from "../book.model";

@Injectable()
export class BooksService {
  authToken:any;
  book : Book;

  GetBooksUrl = 'http://localhost:8080/books/books';
  AddNewBooks = 'http://localhost:8080/books/addbook';
  EditBook = 'http://localhost:8080/books/updatebookquantity';
  DeleteBook = 'http://localhost:8080/books/deleteByIsbn';
  IssueBook = 'http://localhost:8080/books/issuebook';
  MyBooks = 'http://localhost:8080/books/assignedbooktouser';
  BookDetailsByIsbn = 'http://localhost:8080/books/getbookdetailsbyisbn';
  AllAssignedBooks = 'http://localhost:8080/books/assignedbooks';
  PostReview = 'http://localhost:8080/review/addreview';
  GetReviewByISBN = 'http://localhost:8080/review/getreview';
  ReturnBook = 'http://localhost:8080/books/returnbook';
  SearchBook = 'http://localhost:8080/books/searchbook';

  constructor(private http : Http) { }

  //set book
  setBook(book : Book) {
    this.book = book;
  }
  //get book
  getBook() {
    return this.book;
  }

  //get all books
  getBooks() {
    this.loadtoekn();
    const headers = new Headers({ 
      'Content-Type': 'application/json' ,
      'Accept' : 'application/json',
      'Authorization' : this.authToken
    });

    return this.http.get(this.GetBooksUrl, { 'headers' : headers});
  }

  //search book
  searchBook(searchBy : string, searchKey : string) {
    this.loadtoekn();
    const headers = new Headers({ 
      'Content-Type': 'application/json' ,
      'Accept' : 'application/json',
      'Authorization' : this.authToken
    });

    return this.http.post(this.SearchBook, {'searchBy' : searchBy, 'searchKey' : searchKey},  { 'headers' : headers});
  }

  //add new books
  addNewBooks(newBook : Book) {
    this.loadtoekn();
    const headers = new Headers({ 
      'Content-Type': 'application/json' ,
      'Accept' : 'application/json',
      'Authorization' : this.authToken
    });

    return this.http.post(this.AddNewBooks, newBook, { 'headers' : headers});
  }

  //Edit book. it will update quantity only as of now
  editBook(bookQuantity : string, bookISBN : String) {
    this.loadtoekn();
    const headers = new Headers({ 
      'Content-Type': 'application/json' ,
      'Accept' : 'application/json',
      'Authorization' : this.authToken
    });

    return this.http.post(this.EditBook, {'bookQuantity' : bookQuantity, 'bookISBN' : bookISBN}, { 'headers' : headers});
  }

  //Delete book by ISBN
  deleteBook(bookISBN : string) {
    this.loadtoekn();
    const headers = new Headers({ 
      'Content-Type': 'application/json' ,
      'Accept' : 'application/json',
      'Authorization' : this.authToken
    });

    return this.http.post(this.DeleteBook, {'bookISBN' : bookISBN}, { 'headers' : headers});
  }

  //Issue book to shelf
  issueBook(bookISBN : string, quantity : number) {
    this.loadtoekn();
    const headers = new Headers({ 
      'Content-Type': 'application/json' ,
      'Accept' : 'application/json',
      'Authorization' : this.authToken
    });

    return this.http.post(this.IssueBook, {'bookISBN' : bookISBN, 'bookQuantity' : quantity}, { 'headers' : headers});
  }

  //return book 
  returnBook(bookISBN) {
    this.loadtoekn();
    const headers = new Headers({ 
      'Content-Type': 'application/json' ,
      'Accept' : 'application/json',
      'Authorization' : this.authToken
    });

    return this.http.post(this.ReturnBook, {'bookISBN' : bookISBN}, { 'headers' : headers});
  }

  //Get all my assigned books
  getMyBooks() {
    this.loadtoekn();
    const headers = new Headers({ 
      'Content-Type': 'application/json' ,
      'Accept' : 'application/json',
      'Authorization' : this.authToken
    });

    return this.http.get(this.MyBooks, { 'headers' : headers});
  }

  //get book details by ISBN
  getBookDetailsByIsbn(bookISBN : string) {
    this.loadtoekn();
    const headers = new Headers({ 
      'Content-Type': 'application/json' ,
      'Accept' : 'application/json',
      'Authorization' : this.authToken
    });

    return this.http.post(this.BookDetailsByIsbn, {'bookISBN' : bookISBN}, { 'headers' : headers});
  }

  //Get all assigned books to all users
  getAllAssignedBooks() {
    this.loadtoekn();
    const headers = new Headers({ 
      'Content-Type': 'application/json' ,
      'Accept' : 'application/json',
      'Authorization' : this.authToken
    });

    return this.http.get(this.AllAssignedBooks, { 'headers' : headers});
  }

  //post review comments
  postReviewComment(reviewComment) {
    this.loadtoekn();
    const headers = new Headers({ 
      'Content-Type': 'application/json' ,
      'Accept' : 'application/json',
      'Authorization' : this.authToken
    });

    return this.http.post(this.PostReview, reviewComment, { 'headers' : headers});
  }

  //get book review by isbn
  getBookReviewByISBN(bookISBN : string) {
    this.loadtoekn();
    const headers = new Headers({ 
      'Content-Type': 'application/json' ,
      'Accept' : 'application/json',
      'Authorization' : this.authToken
    });

    return this.http.post(this.GetReviewByISBN, {'bookISBN' : bookISBN}, { 'headers' : headers});
  }

  loadtoekn() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}
