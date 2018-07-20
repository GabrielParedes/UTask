import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Users  } from "../../../models/user.model";
import { AuthService } from "../../../service/auth-service.service";

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
})

export class RegisterPageComponent implements OnInit{
    @ViewChild('f') registerForm: NgForm;
    public user: Users;
    public identity;
    public token;
    public status: string;

  constructor(
    private http: HttpClient,
    private userService: AuthService,
    private router: Router
  ) {
    this.user = new Users("", "", "", "", "", "", "");
  }
    //  On submit click, reset field value

    ngOnInit() {}
   /*private url = "http://localhost:3000/api/user/userRegister";
    enterUser() {
      this.userService.registrar(this.user).subscribe(data => {
        this.identity = data.user;
        console.log(this.identity);
        localStorage.setItem("identity", JSON.stringify(this.identity));
        this.getToken();
      });
    }
    getToken() {
    this.userService.login(this.user, "true").subscribe(
      response => {
        this.token = response.token;
        console.log(this.token);
        if (this.token <= 0) {
          this.status = "error";
        } else {
          //PERSISTIR DATOS DEL USUARIO
          localStorage.setItem("token", this.token);
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }*/


  onSubmit(){
    this.userService.registrar(this.user).subscribe(
      response => {
        if(response){
          console.log(response.user);
          this.status = 'success';
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    )
  }
}
