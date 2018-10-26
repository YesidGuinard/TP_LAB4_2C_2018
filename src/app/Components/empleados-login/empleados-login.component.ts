import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Login } from 'src/app/Model/Login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/Model/User';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-empleados-login',
  templateUrl: './empleados-login.component.html',
  styleUrls: ['./empleados-login.component.scss']
})
export class EmpleadosLoginComponent implements OnInit {

  public form : FormGroup;
  public error : boolean;
  public errorMessage : string;

  constructor(private fb: FormBuilder, private authService : AuthService, private jwt : JwtHelperService, private router : Router) {
    this.form = this.fb.group({
        usuario: ['', Validators.required],
        password: ['', Validators.required]
    });

   }

  ngOnInit() {
  }

  public Submit():void{
    this.errorMessage = "";
    this.error = false;
    if(this.form.valid){
      let dataLogin : Login = new Login(this.form.get("usuario").value,
                              this.form.get("password").value);
      this.authService.Loguear(dataLogin)
      .then(
        response => {     
          if(response["Estado"] === "OK"){
            let token : JSON = this.jwt.decodeToken(response["Token"]);
            let user : User = new User(token["usuario"],token["tipo"],token["id"],token["nombre"], response["Token"]);
            localStorage.setItem("currentUser",JSON.stringify(user));
            localStorage.setItem("token",JSON.stringify(token));
            if(!this.authService.redirectUrl){
              this.authService.redirectUrl = "/Empleados";
            }
            this.router.navigate([this.authService.redirectUrl]);
          }
          else{
            this.error = true;
            this.errorMessage = response["Mensaje"];
          }
        }
      )
      .catch(
        response => {
          console.error(response);
        }
      );
    }
    else{
      this.errorMessage = "Debe completar los campos correctamente."
      this.error = true;
    }
  }

}
