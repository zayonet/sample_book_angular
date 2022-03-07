import { AccountService } from '../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  account = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      const result = await this.accountService.createAccount(this.account)
        .then(retorno => {
          this.accountService.showMessage('SISTEMA', `${this.account.name} foi registado com sucesso.`, 'toast-success');
          this.router.navigate(['/login']);
        });
    } catch (error) {
      console.log(error)
    }
  }
}
