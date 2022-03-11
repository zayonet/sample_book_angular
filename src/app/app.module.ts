import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { SharedModule } from './shared/shared.module';

import { HeaderComponent } from './components/templates/header/header.component';
import { FooterComponent } from './components/templates/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ListBooksComponent } from './components/book/list-books/list-books.component';

import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { CreateBookComponent } from './components/book/create-book/create-book.component';
import { LoginComponent } from './components/account/login/login.component';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { httpInterceptorProviders } from './components/http-interceptor';
import { ProfileComponent } from './components/account/profile/profile.component';
import { ShowBookComponent } from './components/book/show-book/show-book.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { CategoryComponent } from './components/book/category/category.component';
import { AboutComponent } from './components/about/about.component';

registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ListBooksComponent,
    CreateBookComponent,
    LoginComponent,
    CreateAccountComponent,
    AuthenticationComponent,
    ProfileComponent,
    ShowBookComponent,
    CategoryComponent,
    AboutComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    Ng2OrderModule,
    ToastrModule.forRoot(), // ToastrModule added,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
