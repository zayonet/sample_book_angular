import { Component, OnInit } from '@angular/core';
import ICategories from '../../../model/ICategory'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor() { }

  categories = ICategories;
  searchCategory: any;

  ngOnInit(): void {
  }

  SearchByCategory(): void {
    if (this.searchCategory === "") {
      this.ngOnInit();
    }
    else {
      this.categories = this.categories.filter(response => {
        return response.category?.toLocaleLowerCase().match(this.searchCategory?.toLocaleLowerCase());
      })
    }
  }

}
