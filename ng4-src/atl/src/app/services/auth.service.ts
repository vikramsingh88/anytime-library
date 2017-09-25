import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';

import { User } from "../user.model";

@Injectable()
export class AuthService {
  registerUrl = 'http://localhost:8080/users/register';
  loginUrl = 'http://localhost:8080/users/login';
  GetUserById = 'http://localhost:8080/users/getUserById';
  GetNonAdminUsers = 'http://localhost:8080/users/getNonAdminUsers';

  token : string;
  authToken:any;
  user : any;

  constructor(private http : Http) { }
  //Register new user
  registerUser(user : User) {
    const headers = new Headers({ 
      'Content-Type': 'application/json' ,
      'Accept' : 'application/json'
    });

    return this.http.post(this.registerUrl, user, { 'headers' : headers});
  }

  //Login new user
  login(email : string, password : string) {
    const headers = new Headers({ 
      'Content-Type': 'application/json' ,
      'Accept' : 'application/json'
    });

    return this.http.post(this.loginUrl, {'email' : email, 'password' : password}, { 'headers' : headers});
  }

  //Save jwt token for future use
  saveJwt(token : string, user : any) {
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  isLogedIn() {
    return tokenNotExpired('id_token');
  }

  isAdmin() : boolean {
    return this.getUser().admin === 'true' ? true : false;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUserById(userId : string) {
    this.loadtoekn();
    const headers = new Headers({ 
      'Content-Type': 'application/json' ,
      'Accept' : 'application/json',
      'Authorization' : this.authToken
    });

    return this.http.post(this.GetUserById, {'userId' : userId}, { 'headers' : headers});
  }

  //Get All non admin users
  getAllNonAdminusers() {
    this.loadtoekn();
    const headers = new Headers({ 
      'Content-Type': 'application/json' ,
      'Accept' : 'application/json',
      'Authorization' : this.authToken
    });

    return this.http.get(this.GetNonAdminUsers, { 'headers' : headers});
  }

  loadtoekn() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  signOut() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

}
