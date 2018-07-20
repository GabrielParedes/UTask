import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Users } from "../models/user.model";

@Injectable()
export class AuthService{
  public url:string;
  public token;
  public identity;

  constructor (
    public _http: HttpClient
  ){
    this.url = 'http://localhost:3000/api/'
  }

  registrar(user: Users): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this._http.post(this.url + "user/userRegister", params, {
      headers: headers
    });
  }

  updateUser(user: Users): Observable<any> {
  let params = JSON.stringify(user);
  let headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Authorization", this.getToken());

  return this._http.put(
    this.url + "update-user/" + user.UserId,
    params,
    {
      headers: headers
    }
  );
}

login(loginData, gettoken = null): Observable<any> {
    if (gettoken != null) {
      loginData.gettoken = gettoken;
    }

    let params = JSON.stringify(loginData);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    console.log(loginData);
    return this._http.post(this.url+"user/loginUser", params, {
      headers: headers
    });
  }

getIdentity() {
    var identity = JSON.parse(localStorage.getItem("identity"));
    if (identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

getToken() {
    let token = localStorage.getItem("token");
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }


}
