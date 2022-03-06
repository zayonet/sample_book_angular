import { IUser } from './../../../model/IUser.model';

import { AccountService } from '../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any = {};

  user: IUser = {
    id: '',
    name: '',
    email: '',
    password: '',
    active: true,
  };

  constructor(
    public accountService: AccountService,
    private actRoute: ActivatedRoute,
    fb: FormBuilder
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    let user = window.localStorage.getItem('_id');
    if (!user && !id && user !== id) {
      this.accountService.signOut;
    } else {
      this.accountService.getUserProfile(user).subscribe(response => {
        this.currentUser = response;
      });
    }
  }

  ngOnInit(): void {
    const id = String(this.actRoute.snapshot.paramMap.get('id'));
    this.accountService.getAccountId(id)
      .then(retorno => this.user = retorno);

  }

  async updateTo() {
    try {
      const result = await this.accountService.updateAccount(this.user)
        .then(retorno => this.user = retorno)
        .catch(onrejected => console.error(onrejected)
        );
      console.log(result);
    } catch (error) {
      console.log(error)
    }
  }

  async deleteTo(user: IUser) {
    try {
      const result = await this.accountService.deleteAccount(user.id)
        .then(retorno => this.user = retorno)
        .catch(onrejected => console.error(onrejected)
        );
      console.log(result);
    } catch (error) {
      console.log(error)
    }
  }

}
