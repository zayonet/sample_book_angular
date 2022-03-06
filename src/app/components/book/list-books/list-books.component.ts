import { IBook } from './../../../model/IBook.model';
import { BookService } from './../../../services/book.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  listBooks: IBook[] = [];
  /* bookList: any[] = [
    {
      id: 1,
      title: "Energia elétrica",
      price: "200.35",
      author: "Fernando Dallas",
      description: "Helo world",
      category: "arte",
      image: "assets/img/books/book1.jpeg",
      created_at: "2021-08-4",
      update_at: "2021-01-3",
    },
    {
      id: 2,
      title: "Tornar-se um decifrador de pessoas",
      price: "150.55",
      author: "Henrique Gonsalves",
      description: "Cards support a wide variety of content, including images.",
      category: "arte",
      image: "assets/img/books/book2.jpeg",
      created_at: "2021-09-3",
      update_at: "2021-01-3",
    },
    {
      id: 3,
      title: "Grandes palavras pequenas acções",
      price: "320.55",
      author: "Fernando Dallas",
      description: "list groups, links, and more. Below are examples of what’s supported.",
      category: "arte",
      image: "assets/img/books/book3.jpeg",
      created_at: "2021-01-1",
      update_at: "2021-01-3",
    },
    {
      id: 4,
      title: "A powerful path",
      price: "100.53",
      author: "John Lima",
      description: "list groups, links, and more. Below are examples of what’s supported.",
      category: "arte",
      image: "assets/img/books/book4.jpeg",
      created_at: "2021-01-7",
      update_at: "2021-01-3",
    },
    {
      id: 5,
      title: "War & Peace",
      price: "199.35",
      author: "Fernando DallasHendeck Killas",
      description: "list groups, links, and more. Below are examples of what’s supported.",
      category: "arte",
      image: "assets/img/books/book5.jpeg",
      created_at: "2021-01-7",
      update_at: "2021-01-3",
    },
    {
      id: 6,
      title: "About Python 3",
      price: "620.55",
      author: "Guetter Tolla",
      description: "list groups, links, and more. Below are examples of what’s supported.",
      category: "arte",
      image: "assets/img/books/book6.jpeg",
      created_at: "2021-01-7",
      update_at: "2021-01-3",
    },
  ] */

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.listBooks().subscribe(elements => { this.listBooks = elements });
  }
}
