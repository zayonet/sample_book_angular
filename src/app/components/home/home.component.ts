import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string = 'Python 3';
  price: number = 12.25;
  description: string = 'Cards support a wide variety of content, including images, text, list groups, links, and more. Below are examples of what’s supported.';
  image: string = "assets/img/books/book1.jpeg"
  footer: string = "assets/img/footer_book.svg"

  constructor() { }

  ngOnInit(): void {
  }

}
