import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.css']
})
export class CardBookComponent implements OnInit {
  @Input() id: string = "";
  @Input() title: string = "";
  @Input() price: string = "";
  @Input() author: string = "";
  @Input() description: string = "";
  @Input() category: string = "";
  @Input() image: File[] = [];
  @Input() publishing_company: string = "";
  @Input() created_at: string = "";
  @Input() update_at: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
