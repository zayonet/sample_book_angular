import { IUser } from './../../../model/IUser.model';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: IUser = {
    id: '',
    name: '',
    email: '',
    password: '',
    active: true,
    created_at: new Date,
    updated_at: new Date
  };

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      const result = await this.accountService.login(this.login);
      console.log(`Login efeituado: ${result}`);

      //this.router.navigate([''])
    } catch (error) {
      console.error(error)
    }
  }
}
