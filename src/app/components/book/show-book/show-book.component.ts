import { IBook } from './../../../model/IBook.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { AccountService } from 'src/app/services/account.service';
import ICategories from '../../../model/ICategory'

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css']
})
export class ShowBookComponent implements OnInit {

  book: IBook = {
    title: "",
    price: "",
    author: "",
    description: "",
    category: "",
    image: [],
    publishing_company: "",
    user_id: this.accountService.getUserIdStorage()
  };
  currentRoute!: any;
  route!: string;

  categories = ICategories;

  public show: boolean = false;
  public buttonName: any = 'adic.';


  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    const id = String(this.actRoute.snapshot.paramMap.get('id'));
    this.bookService.getBookId(id).then(retorno => this.book = retorno);

    //console.log(this.router.url);
  }
  uploadFile(event: any) {
    const file = event.target.files ? event.target.files[0] : '';
    this.book.image = file;
  }

  saveBook(): void {
    this.bookService.updateAccount(this.book).then(retorno => {
      this.book = retorno;
      this.bookService.showMessage(
        'SISTEMA',
        `${this.book.title} atualizado com sucesso. ID: ${this.book.id}`,
        'toast-sucess'
      );
      this.router.navigate(['/book']);
    });
  }

  async updateTo() {
    try {
      const result = await this.bookService.updateAccount(this.book)
        .then(retorno => {
          this.book = retorno;
          this.bookService.showMessage('SISTEMA', `${this.book.title} foi atualizado com sucesso.`, 'toast-success');
          this.router.navigate(['/book']);
        })
        .catch(onrejected => console.error(onrejected)
        );
    } catch (error) {
      this.bookService.showError(error);
    }
  }

  async deleteTo(book: IBook) {
    try {
      const result = await this.bookService.deleteAccount(book.id)
        .then(retorno => {
          this.book = retorno;
          this.router.navigate(['/book']);
          this.bookService.showMessage('SISTEMA', `${this.book.title} foi excluido com sucesso.`, 'toast-success');
        })
        .catch(onrejected => console.error(onrejected)
        );
      console.log(result);
    } catch (error) {
      console.log(error)
    }
  }

  toggle() {
    this.show = !this.show;

    if (this.show)
      this.buttonName = "Não";
    else
      this.buttonName = "Sim";
  }

}
