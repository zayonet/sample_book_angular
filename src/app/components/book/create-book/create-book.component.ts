import { BookService } from './../../../services/book.service';
import { AccountService } from './../../../services/account.service';
import { IBook } from './../../../model/IBook.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ICategories from '../../../model/ICategory'

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  book: IBook = {
    title: "",
    price: "",
    author: "",
    description: "",
    category: "",
    image: [],
    publishing_company: "",
    user_id: this.accountService.getUserIdStorage()
  }
  categories = ICategories;

  constructor(private bookService: BookService, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  uploadFile(event: any) {
    const file = event.target.files ? event.target.files[0] : '';
    this.book.image = file;
  }

  saveBook(): void {
    console.log(this.accountService.getUserIdStorage())
    this.bookService.createBook(this.book).subscribe(retorno => {
      this.book = retorno;
      this.bookService.showMessage(
        'SISTEMA',
        `${this.book.title} guardado com sucesso.`,
        'toast-sucess'
      );
      this.router.navigate(['/book']);
    });
  }

}
