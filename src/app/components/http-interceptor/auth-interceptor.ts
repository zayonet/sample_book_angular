import { Injectable } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = this.accountService.getAuthorizationToken();
    let request: HttpRequest<any> = req;

    if (token && !this.accountService.isTokenExpired(token)) {
      // O request é imutavel, ou seja, não é possível mudar nada
      // Faço o clone para conseguir mudar as propriedades
      // Passo o token de autenticação no header
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    // retorno o request com o erro tratado
    return next.handle(request)
      .pipe(
        catchError(this.handleError)
      );
  }

  showMessage(title: string, message: string, type: string): void {
    this.toastr.show(title, message, { closeButton: true, progressBar: true }, type);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erro de client-side ou de rede
      console.error('Ocorreu um erro:', error.error.message);
      //this.showMessage('OCORREU UM ERRO', error.error.message, 'toast-error');
      //this.toastr.show('OCORREU UM ERRO', error.error.message, { closeButton: true, progressBar: true }, 'toast-error');
    } else {
      // Erro retornando pelo backend
      console.error(
        `Código do erro ${error.status}, ` +
        `Erro: ${JSON.stringify(error.error)}`);
      //this.showMessage(`Código do erro ${error.status},`, JSON.stringify(error.error.message), 'toast-error');
    }
    // retornar um observable com uma mensagem amigavel.
    const err = new Error('Ocorreu um erro, tente novamente')
    return throwError(() => err);

  }
}
