import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Users  } from "../../../models/user.model";
import { AuthService } from "../../../service/auth-service.service";


@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],

})

export class LoginPageComponent implements OnInit {

    @ViewChild('f') loginForm: NgForm;

    public loginData: Users;
    public token;

    public status:string;
    public identity;



    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private userService: AuthService
    ) {
      this.loginData = new Users("", "", "", "", "", "", "");
    }

    ngOnInit(){
    }

    // On submit button click
    onSubmit() {
        this.userService.login(this.loginData).subscribe(
           response=>{
             this.identity = response.loginData;
             console.log(this.identity);
            if (!this.identity){
              alert("datos erroneos");
            } else {
              localStorage.setItem("identity", JSON.stringify(this.identity));
              alert("Ingreso Correcto");
              this.getToken();

            }
          },
          error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
            console.log("error");
            if (errorMessage != null) {
              this.status = "error";
            }
          }
        )

    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }

    getToken() {
    this.userService.login(this.loginData, "true").subscribe(
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
  }
}
