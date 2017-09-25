import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MdDialogModule } from "@angular/material";
import {RatingModule} from "ng2-rating";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from "./app-routing.module";
import { AuthService } from "./services/auth.service";
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AuthGuard } from "./services/auth.guard";
import { NavbarComponent } from './components/navbar/navbar.component';
import { BooksService } from "./services/books.service";
import { UsersComponent } from './components/admin-dashboard/users/users.component';
import { BooksComponent } from './components/admin-dashboard/books/books.component';
import { AssignedBooksComponent } from './components/admin-dashboard/assigned-books/assigned-books.component';
import { BookShelfComponent } from './components/user-dashboard/book-shelf/book-shelf.component';
import { BookLibraryComponent } from './components/user-dashboard/book-library/book-library.component';
import { AdminGuard } from "./services/admin.guard";
import { SortPipe } from './pipes/sort.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { BookReviewComponent } from './components/book-review/book-review.component';
import { BookDetailsComponent } from './components/user-dashboard/book-details/book-details.component';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    NavbarComponent,
    UsersComponent,
    BooksComponent,
    AssignedBooksComponent,
    BookShelfComponent,
    BookLibraryComponent,
    SortPipe,
    ProfileComponent,
    BookReviewComponent,
    BookDetailsComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FlashMessagesModule,
    MdDialogModule,
    RatingModule
  ],
  providers: [AuthService, BooksService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent],
  entryComponents: [BookReviewComponent]
})
export class AppModule { }
