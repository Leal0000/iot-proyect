import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { loginI } from 'src/app/models/login.interface';
import { responseI } from 'src/app/models/response.interface';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  status : boolean = false;

  msg : any = "";

  loginForm = new FormGroup({
    user : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

  constructor(private api:ApiService, private router:Router, private alerta:AlertasService ) { }

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard']);
    }
    else{
      this.router.navigate(['login']);
    }
  }

  login(form:loginI){
    this.api.loginUser(form).subscribe(data => {
      console.log(data);
      let dataResponse:responseI = data;
      if(dataResponse.status == "true"){
        localStorage.setItem("token", data.token);
        this.router.navigate(['dashboard']);
        this.alerta.showSuccess(dataResponse.response, "Bienvenido");
      }
      else{
        this.status = true;
        this.msg = dataResponse.response;
        this.alerta.showError(dataResponse.response, "Error");
      }
    });
  }


  register(){
    this.router.navigate(['crear']);
  }

}
