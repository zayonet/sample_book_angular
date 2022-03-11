import { IBook } from './../model/IBook.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private URL: string = environment.api + '/book'
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router) { }

  listBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.URL).pipe(
      map(item => item),
      catchError(error => this.showError(error))
    );
  }

  createBook(book: IBook): Observable<any> {

    let formData: any = new FormData();
    formData.append("title", book.title);
    formData.append("price", book.price);
    formData.append("category", book.category);
    formData.append("description", book.description);
    formData.append("image", book.image);
    formData.append("user_id", book.user_id);
    formData.append("author", book.author);
    formData.append("publishing_company", book.publishing_company);

    return this.http.post<IBook>(this.URL, formData).pipe(
      map(retorno => retorno),
      catchError(error => this.showError(error))
    );
  }

  /* get user function */
  async getBookId(id: string): Promise<IBook> {
    return await firstValueFrom(this.http.get<IBook>(`${environment.api}/book/${id}`))
      .then(onfulfilled => {
        this.router.navigate([`/book/${onfulfilled.id}`]);
        return onfulfilled
      });
  }
  /* updated book function */
  async updateAccount(book: IBook): Promise<IBook> {
    let formData: any = new FormData();
    formData.append("title", book.title);
    formData.append("price", book.price);
    formData.append("category", book.category);
    formData.append("description", book.description);
    formData.append("image", book.image);
    formData.append("user_id", book.user_id);
    formData.append("author", book.author);
    formData.append("publishing_company", book.publishing_company);

    let api = `${environment.api}/book/${book.id}`;

    return await firstValueFrom(this.http.put<IBook>(api, formData));

  }

  /* delete book function */
  async deleteAccount(id: any): Promise<any> {
    let api = `${environment.api}/book/${id}`;

    return await firstValueFrom(this.http.delete<any>(api, { headers: this.headers }));

  }


  showError(e: any): Observable<any> {
    this.showMessage('ERRO!!!', 'Não foi possível realizar a operação', 'toast-error');
    return EMPTY;
  }

  showMessage(title: string, message: string, type: string): void {
    this.toastr.show(title, message, { closeButton: true, progressBar: true }, type);
  }

}
