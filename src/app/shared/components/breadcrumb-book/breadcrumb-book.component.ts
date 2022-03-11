import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb-book',
  templateUrl: './breadcrumb-book.component.html',
  styleUrls: ['./breadcrumb-book.component.css']
})
export class BreadcrumbBookComponent implements OnInit {

  @Input() currentRoute: string = "";
  //currentRoute!: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    //console.log(this.router.url);
    // Change how the operator is called
    /*  this.router.events.pipe(
       filter(event => event instanceof NavigationEnd)
     ).subscribe(() => {
       this.currentRoute = this.activatedRoute.queryParams;
       console.log(this.activatedRoute.queryParams);
     }); */

    /* this.router.events..pipe(filter(event: Event) => event instanceof NavigationEnd)
      .subscribe(event => {
        this.currentRoute = event.url;
        console.log(event);
      }); */
  }

}
