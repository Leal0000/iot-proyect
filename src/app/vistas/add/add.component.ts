import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { loginI } from 'src/app/models/login.interface';
import { responseI } from 'src/app/models/response.interface';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  status:boolean = false;
  msg:string = "";

  createForm = new FormGroup({
    user: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private api:ApiService, private router:Router, private alerta:AlertasService ) { }

  ngOnInit(): void {
  }

  create(form:loginI){
    this.api.createUser(form).subscribe(data => {
      console.log(data);
      let dataResponse:responseI = data;
      if(data.status == "true"){
        let email = dataResponse.user;
        this.alerta.showSuccess(data.response, "User Created");
        this.router.navigate(['code', email]);
      }
      else{
        this.alerta.showError(data.response, "Error")
      }
    });
  }

  login(){
    this.router.navigate(['login']);
  }
//emmardf_p508x@xeoty.com  Morado14A+*
}
