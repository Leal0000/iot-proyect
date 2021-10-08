import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { codeI } from 'src/app/models/cod.interface';
import { code } from 'src/app/models/code.interface';
import { responseI } from 'src/app/models/response.interface';
import { AlertasService } from 'src/app/services/alertas.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  status : boolean = false;

  email : any;
  error : string = "";
  msg : any = "";

  codeForm = new FormGroup({
    user : new FormControl('', Validators.required),
    code : new FormControl('', Validators.required)
  })

  constructor(private router:Router, private alertasService : AlertasService, private api:ApiService, private activerouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.email = this.activerouter.snapshot.paramMap.get('email');
    this.codeForm.setValue({
      'user' : this.email,
      'code' : ""
    });
  }

  code(form:code){
    this.api.codeUser(form).subscribe(data => {
      console.log(data);
      if(data.status == "true"){
        this.alertasService.showSuccess(data.response, 'Confirmado');
        this.router.navigate(['login']);
      }
      else{
        this.alertasService.showError(data.response, 'Error');
        this.status = true;
        this.msg = data.response;
      }
    });
  }

}
