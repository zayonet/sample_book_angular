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

  createBook(book: IBook): Observable<any> {
    console.log(book.image)
    let formData: any = new FormData();
    formData.append("title", book.title);
    formData.append("price", book.price);
    formData.append("category", book.category);
    formData.append("description", book.description);
    formData.append("image", book.image);
    formData.append("user_id", book.user_id);
    return this.http.post<IBook>(this.URL, formData).pipe(
      map(retorno => retorno),
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

}
