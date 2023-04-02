import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Login } from 'src/app/model/login';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formValue!: FormGroup;
  loginObj: Login = new Login();

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    this.loginObj.email = this.formValue.value.email;
    this.loginObj.password = this.formValue.value.password;

    this.loginService.loginUser(this.loginObj).subscribe(
      (res) => {
        localStorage.setItem('token', res.accessToken);
        console.log(localStorage.getItem('token'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
