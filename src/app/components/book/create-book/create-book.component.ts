import { BookService } from './../../../services/book.service';
import { IBook } from './../../../model/IBook.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    image: "",
    user_id: "92d76c40-50d7-424d-b9c3-bdae4e713786"
  }
  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
  }

  saveBook(): void {
    this.bookService.createBook(this.book).subscribe(retorno => {
      this.book = retorno;
      this.bookService.showMessage(
        'SISTEMA',
        `${this.book.title} guardado com sucesso. ID: ${this.book.id}`,
        'toast-sucess'
      );
      this.router.navigate(['/book']);
    });
  }

}
