import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardBookComponent } from './components/card-book/card-book.component';



@NgModule({
  declarations: [
    CardBookComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardBookComponent
  ]
})
export class SharedModule { }
