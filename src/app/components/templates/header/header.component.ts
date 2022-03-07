import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/model/IUser.model';
import { AccountService } from '../../../services/account.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /* userIn = {
    name: "",
    email: ""
  } */
  listUsers = {};
  currentUser = {}
  constructor(private accountService: AccountService, private actRoute: ActivatedRoute) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    let user = accountService.getUserIdStorage();
    //console.log(user);
    if (!user && !id && user !== id) { //certo
      /* if (user !== id) { */
      this.accountService.signOut;
    } else {
      this.accountService.getUserProfile(user).subscribe(response => {
        this.currentUser = response;
      });
    }
  }

  ngOnInit(): void {
    //console.log(this.getProfile());
  }
  get isLogged() {
    return this.accountService.isUserLoggedIn();
  }
  getProfile(): IUser {
    //console.log(this.accountService.userIn)
    return this.accountService.userIn;

    //return this.listUsers;
  }
  signOut() {
    this.accountService.signOut()
  }

}
