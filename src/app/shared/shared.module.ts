import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardBookComponent } from './components/card-book/card-book.component';
import { BreadcrumbBookComponent } from './components/breadcrumb-book/breadcrumb-book.component';



@NgModule({
  declarations: [
    CardBookComponent,
    BreadcrumbBookComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardBookComponent
  ]
})
export class SharedModule { }
