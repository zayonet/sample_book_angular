import { IBook } from './../../../model/IBook.model';
import { BookService } from './../../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  listBooks: IBook[] = [];
  searchTitle: any;
  p: number = 1;
  key: string = 'id';
  reverse: boolean = true;

  book: IBook = {
    title: "",
    price: "",
    author: "",
    description: "",
    category: "",
    image: [],
    publishing_company: "",
    user_id: this.accountService.getUserIdStorage(),
  }

  constructor(private bookService: BookService, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.listBooks().subscribe(elements => { this.listBooks = elements });
  }

  uploadFile(event: any) {
    const file = event.target.files ? event.target.files[0] : '';
    this.book.image = file;
  }

  saveBook(): void {
    this.bookService.createBook(this.book).subscribe(retorno => {
      this.book = retorno;
      this.bookService.showMessage(
        'SISTEMA',
        `${this.book.title} guardado com sucesso. ID: ${this.book.id}`,
        'toast-sucess'
      );
      this.loadBooks();
      this.router.navigate(['/book']);
    });
  }
  SearchByTitle(): void {
    if (this.searchTitle === "") {
      this.ngOnInit();
    }
    else {
      this.listBooks = this.listBooks.filter(response => {
        return response.title?.toLocaleLowerCase().match(this.searchTitle?.toLocaleLowerCase());
      })
    }
  }
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  sorts(event: any) {
    switch (event.target.value) {
      case "Low": {
        this.listBooks = this.listBooks.sort(
          (low, high) => +low.price - +high.price
        );
        break;
      }
      case "High": {
        this.listBooks = this.listBooks.sort(
          (low, high) => +high.price - +low.price
        );
        break;
      }
      case "TitleLow": {
        this.listBooks = this.listBooks.sort(
          (low, high) => high.title.toLowerCase().trim() < low.title.trim().toLowerCase() ? 1 : -1
        );
        break;
      }
      case "TitleHight": {
        this.listBooks = this.listBooks.sort(
          (low, high) => high.title.toLowerCase().trim() > low.title.trim().toLowerCase() ? 1 : -1
        );
        break;
      }
      case "AuthorLow": {
        this.listBooks = this.listBooks.sort(
          (low, high) => high.author.toLowerCase().trim() < low.author.trim().toLowerCase() ? 1 : -1
        );
        break;
      }
      case "AuthorHight": {
        this.listBooks = this.listBooks.sort(
          (low, high) => high.author.toLowerCase().trim() > low.author.trim().toLowerCase() ? 1 : -1
        );
        break;
      }
      case "DateLow": {
        this.listBooks = this.listBooks.sort((low, high) => high.created_at! < low.created_at! ? 1 : -1)
        break;
      }
      case "DateHight": {
        this.listBooks = this.listBooks.sort((low, high) => high.created_at! > low.created_at! ? 1 : -1)
        break;
      }
    }
  }
}
