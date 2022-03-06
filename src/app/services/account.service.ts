import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, firstValueFrom, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

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

  /* async login(user: any) {
    let firstValue = await firstValueFrom(this.http.post<any>(`${environment.api}/session`, user));

    if (firstValue && firstValue.token) {
      window.localStorage.setItem('token', firstValue.token);

      //window.localStorage.setItem("user", JSON.stringify({ 'name': firstValue.user.name, 'email': firstValue.user.email }));
      //this.currentUserSubject.next(firstValue.user)
      return true;
    } else {
      catchError(error => this.showError(error));
      return;
    }
  } */

  //* login function */
  login(user: IUser) {
    return this.http
      .post<IUser>(`${environment.api}/session`, user)
      .pipe(tap(user => this.userIn = user))
      .subscribe((userInfo: any) => {
        window.localStorage.setItem('token', userInfo.token);
        localStorage.setItem("_id", userInfo.user.id);
        this.getAccountId(userInfo.user.id).then(response => {
          this.router.navigate([`/profile/${response.id}`]);
          return true;
        }).catch(catchError(error => this.showError(error)))
        /* this.getUserProfile(userInfo.user.id).subscribe(response => {
          if (response) {
            //console.log(response.id)
            this.router.navigate([`/profile/${response.id}`]);
            return true;
          } else {
            catchError(error => this.showError(error));
            return;
          }
        }); */
      });

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


  /* create account user function */
  async createAccount(account: any): Promise<any> {
    await firstValueFrom(this.http.post<any>(`${environment.api}/user`, account))
      .then(retorno => {
        this.showSuccess();
        this.router.navigate(['/login']);
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

    await firstValueFrom(this.http.put<IUser>(api, user, { headers: this.headers }))
      .then(onfulfilled => {
        this.showSuccess();
        this.router.navigate([`/profile/${onfulfilled.id}`]);

      }).catch(error => {
        this.showError(error)
      });
    return console.log("user updated")!;
  }

  /* delete user function */
  async deleteAccount(id: any): Promise<any> {
    let api = `${environment.api}/user/${id}`;
    let firstValue = await firstValueFrom(this.http.delete<any>(api, { headers: this.headers }))
      .then(onfulfilled => {
        this.signOut();
        return onfulfilled
      });
    return firstValue
  }

  /* user auth function */
  getAuthorizationToken(): string | null {
    const token = window.localStorage.getItem('token');
    return token;
  }
  /* async getUserId() {
    //const id = await JSON.parse(window.localStorage.getItem('_id')!);
    const id = window.localStorage.getItem('_id');
    return id;
  } */
  getUserId(): string | any {
    let text = window.localStorage.getItem("_id");

    let obj = text!//.toString();
    //const id = window.localStorage.getItem('_id');
    return obj;

  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null as any;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

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

  isUserLoggedIn(): boolean {
    const token = this.getAuthorizationToken();

    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }

  // User profile

  // User profile
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
  getCurrentUser(): Observable<IUser> {
    //const user = this.currentUserSubject.asObservable();
    //console.log(user)
    //const user = JSON.parse(window.localStorage.getItem('user')!);
    //return user.user.pipe(map(user => this.userIn = user))
    return this.currentUserSubject.asObservable();
  }

  signOut() {
    let removeToken = window.localStorage.removeItem("token");
    window.localStorage.removeItem("_id");
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }

  // Error
  /* handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  } */
}
