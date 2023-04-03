import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/model/register';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formValue!: FormGroup;
  registerObj: Register = new Register();

  constructor(
    private formBuidler: FormBuilder,
    private regService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuidler.group({
      username: [''],
      email: [''],
      password: [''],
    });
  }

  register() {
    console.log(this.formValue);

    this.registerObj.username = this.formValue.value.username;
    this.registerObj.email = this.formValue.value.email;
    this.registerObj.password = this.formValue.value.password;

    this.regService.registerUser(this.registerObj).subscribe(
      (res) => {
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
