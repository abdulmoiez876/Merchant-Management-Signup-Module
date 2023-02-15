import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  name: string = '';
  username: string = '';
  mobileNumber: string = '';
  email: string = '';
  password: string = '';

  isLoading: boolean = false;
  responseMessage: string = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }



  onSubmit(form: any) {
    if (form.invalid) {
      return
    }
    else {
      this.isLoading = true;
      this.httpClient.post<{ token: string }>("http://localhost:8000/user/signup", {
        name: this.name,
        username: this.username,
        email: this.email,
        mobileNumber: this.mobileNumber,
        password: this.password
      }).subscribe(res => {
        alert("User Created Successfully!");
        this.isLoading = false;
      }, err => {
        alert(err.error.message);
        this.isLoading = false;
      })
    }
  }
}
