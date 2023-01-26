import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from './auth.model';

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(email: string, password: string, username: string, mobileNo: string, name: string) {
    const authData: AuthData = { email: email, password: password, username: username, mobileNo: mobileNo, name: name };

  }
}
