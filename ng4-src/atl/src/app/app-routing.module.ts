import { NgModule } from "@angular/core";
import {RouterModule, Routes} from '@angular/router';

import { HomeComponent } from "./components/home/home.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { LoginComponent } from "./components/login/login.component";
import { UserDashboardComponent } from "./components/user-dashboard/user-dashboard.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { AuthGuard } from "./services/auth.guard";
import { UsersComponent } from "./components/admin-dashboard/users/users.component";
import { BooksComponent } from "./components/admin-dashboard/books/books.component";
import { AssignedBooksComponent } from "./components/admin-dashboard/assigned-books/assigned-books.component";
import { BookShelfComponent } from "./components/user-dashboard/book-shelf/book-shelf.component";
import { BookLibraryComponent } from "./components/user-dashboard/book-library/book-library.component";
import { AdminGuard } from "./services/admin.guard";
import { ProfileComponent } from "./components/profile/profile.component";
import { BookDetailsComponent } from "./components/user-dashboard/book-details/book-details.component";

const appRoutes: Routes = [
    { 
        path: '',
        component : HomeComponent 
    },
    {
        path:'register',
        component : RegistrationComponent
    },
    {
        path:'login',
        component : LoginComponent
    },
    {
        path:'admin-dashboard',
        component : AdminDashboardComponent,
        canActivate : [AuthGuard, AdminGuard],
        children : [
            {
                path:'',
                component : BooksComponent
            },
            {
                path:'all-user',
                component : UsersComponent,
            },
            {
                path:'books',
                component : BooksComponent,
            },
            {
                path:'assigned-books',
                component : AssignedBooksComponent,
            }
        ]
    },
    {
        path:'user-dashboard',
        component : UserDashboardComponent,
        canActivate : [AuthGuard],
        children : [
            {
                path:'',
                component : BookShelfComponent,
            },
            {
                path:'my-books',
                component : BookShelfComponent,
            },
            {
                path:'library',
                component : BookLibraryComponent,
            },
            {
                path : 'profile',
                component : ProfileComponent
            },
            {
                path : 'book-details/:isbn',
                component : BookDetailsComponent
            }
        ]
    }
    
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}