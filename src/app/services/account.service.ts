import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, firstValueFrom, Observable } from 'rxjs';
import { catchError, map, } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode'

import { IUser } from './../model/IUser.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSubject = new BehaviorSubject<any>(null); // initializing with no user object since logged out

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  getId!: string
  userIn: IUser = {
    id: "",
    name: "",
    email: "",
    password: "",
    active: true,
    created_at: new Date,
    updated_at: new Date
  };
  constructor(private http: HttpClient, private toastr: ToastrService, public router: Router) { }

  /* login function */
  login(user: IUser) {
    return this.http
      .post<IUser>(`${environment.api}/session`, user)
      .pipe(map(user => this.userIn = user), catchError(error => this.showError(error)))
      .subscribe((userInfo: any) => {

        window.localStorage.setItem('token', userInfo.token);
        localStorage.setItem("_id", userInfo.user.id);

        this.getAccountId(userInfo.user.id)
          .then(response => {
            this.router.navigate([`/profile/${response.id}`]);
            return true;
          })
      });
  }

  /* create account user function */
  async createAccount(account: any): Promise<any> {
    await firstValueFrom(this.http.post<any>(`${environment.api}/user`, account))
      .then(retorno => {
        //this.showSuccess();
        //this.router.navigate(['/login']);
      }).catch(error => {
        this.showError(error)
      });
    return console.log("user saved");
  }


  /* get user function */
  async getAccountId(id: string): Promise<IUser> {
    return await firstValueFrom(this.http.get<IUser>(`${environment.api}/user/${id}`))
      .then(onfulfilled => {
        this.router.navigate([`/profile/${onfulfilled.id}`]);
        return onfulfilled
      });
  }

  /* updated user function */
  async updateAccount(user: IUser): Promise<IUser> {

    let api = `${environment.api}/user/${user.id}`;

    return await firstValueFrom(this.http.put<IUser>(api, user, { headers: this.headers }));

  }

  /* delete user function */
  async deleteAccount(id: any): Promise<any> {
    let api = `${environment.api}/user/${id}`;

    return await firstValueFrom(this.http.delete<any>(api, { headers: this.headers }));

  }

  /* user auth function */
  getAuthorizationToken(): string | null {
    const token = window.localStorage.getItem('token');
    return token;
  }


  /* user id in storage function */
  getUserIdStorage(): string | any {
    let text = window.localStorage.getItem("_id");
    let obj = text!
    return obj;
  }

  /* get expiration token function */
  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null as any;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  /* compering expiration token date function */
  isTokenExpired(token?: string): boolean {

    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  /* user active or not function */
  isUserLoggedIn(): boolean {
    const token = this.getAuthorizationToken();

    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }

  // User profile function
  getUserProfile(id: any): Observable<any> {
    let api = `${environment.api}/user/${id}`;
    return this.http.get<any>(api, { headers: this.headers }).pipe(
      map((response) => {
        this.userIn = response;
        return response || {};
      }),
      catchError(erro => this.showError(erro))
    );
  }


  /* log out function */
  signOut() {
    let removeToken = window.localStorage.removeItem("token");
    window.localStorage.removeItem("_id");
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }


  // Error
  showError(e: any): Observable<any> {
    this.showMessage('ERRO!!!', 'Não foi possível realizar a operação', 'toast-error');
    return EMPTY;
  }
  // Success
  showSuccess(): Observable<any> {
    this.showMessage('certo!!!', 'Operação realizada com sucesso', 'toast-success');
    return EMPTY;
  }

  // Message
  showMessage(title: string, message: string, type: string): void {
    this.toastr.show(title, message, { closeButton: true, progressBar: true }, type);
  }

}
