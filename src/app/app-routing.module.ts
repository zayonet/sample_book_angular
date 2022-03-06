import { LoginComponent } from './components/account/login/login.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { AuthGuard } from './shared/guard/auth.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateBookComponent } from './components/book/create-book/create-book.component';
import { ListBooksComponent } from './components/book/list-books/list-books.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/account/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book', component: ListBooksComponent, canActivate: [AuthGuard] },
  { path: 'book/new', component: CreateBookComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'category', component: ListBooksComponent, canActivate: [AuthGuard] },
  {
    path: '', component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'create-account', component: CreateAccountComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
