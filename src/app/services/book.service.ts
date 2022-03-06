import { IBook } from './../model/IBook.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private URL: string = environment.api + '/book'

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  listBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.URL).pipe(
      map(item => item),
      catchError(error => this.showError(error))
    );
  }

  showError(e: any): Observable<any> {
    this.showMessage('ERRO!!!', 'Não foi possível realizar a operação', 'toast-error');
    return EMPTY;
  }

  showMessage(title: string, message: string, type: string): void {
    this.toastr.show(title, message, { closeButton: true, progressBar: true }, type);
  }

  createBook(book: IBook): Observable<any> {
    return this.http.post<IBook>(this.URL, book).pipe(
      map(item => item),
      catchError(error => this.showError(error))
    );
  }
}
