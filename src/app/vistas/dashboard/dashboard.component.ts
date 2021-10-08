import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { ApiService } from 'src/app/services/api.service';
import { statusI } from 'src/app/models/state.interface';
import { stI } from 'src/app/models/st.interface';
import { TempI } from 'src/app/models/temperatura.interface';
import { vaI } from 'src/app/models/va.interface';
import { IluI } from 'src/app/models/ilum.interface';
declare var jQuery:any;
declare var $:any;
/*
abierto: sb-nav-fixd
cerrado= sb-sidenav-toggled
*/ 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  id: any = "";
  body:string="sb-nav-fixd";
  state: any = "";
  data_temp: any = [];
  valor: number = 0;
  hexa: any = "";
  color: any = "";

  formState = new FormGroup({
    state: new FormControl('')
  });

  formVal = new FormGroup({
    valor: new FormControl('')
  })
  
  formIlu = new FormGroup({
    red: new FormControl(''),
    green: new FormControl(''),
    blue: new FormControl(''),
  })

  constructor(private api: ApiService, private alerta: AlertasService, private router: Router) {

  }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.getState();
      this.getValor();
      this.getIluminacion();
      localStorage.setItem('sb|sidebar-toggle', 'true');
      this.barra();
    }
    else{
      this.router.navigate(['login'])
    }
  }

  barra(){
    if(localStorage.getItem('sb|sidebar-toggle') == "true"){
      this.body = "sb-nav-fixd";
      localStorage.setItem('sb|sidebar-toggle', 'false');
    }
    else{
      this.body = "sb-sidenav-toggled";
      localStorage.setItem('sb|sidebar-toggle', 'true');
    }
  }
 
  data(){
    this.router.navigate(['data']);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  dashboard(){
    this.router.navigate(['dashboard']);
  }

  getState() {
    let id = 1;
    this.api.state(id).subscribe(data => {
      console.log(data);
      if (data.state == true) {
        this.state = "checked";
      }
      else {
        this.state = ""
        this.id = id;
      }
    });
  }
  getIluminacion(){
    let id = 1;
    let arrayRGB:any = [];
    this.api.getIluminacion(id).subscribe(data => {
      console.log(data); 
      let hexa_rgb  = this.rgbToHex(data.red, data.green, data.blue);
      console.log(hexa_rgb);
      this.hexa = hexa_rgb;
    });

  }

  updateState(event: Event) {
    let id = 1;
    if ((<HTMLInputElement>event.target).checked) {
      console.log("si");
      let sta: stI;
      this.formState.setValue({
        'state': true
      });
      sta = this.formState.value
      this.api.updateState(sta, id).subscribe(data => {
        console.log(data);
        this.alerta.showSuccess("Lampara encendida", "Successfully")
      });
    }
    else {
      console.log("no");
      let sta: stI;
      this.formState.setValue({
        'state': false
      });
      sta = this.formState.value
      this.api.updateState(sta, id).subscribe(data => {
        console.log(data);
        this.alerta.showSuccess("Lampara apagada", "Successfully")

      });
    }
  }

  updateValor(event: Event) {
    let id = 1;
    let va = this.valor
    if ((<HTMLInputElement>event.target).value != String(va)) {
      console.log("si");
      let val: vaI;
      this.formVal.setValue({
        'valor': (<HTMLInputElement>event.target).value
      });
      val = this.formVal.value
      this.api.updateValor(val, id).subscribe(data => {
        console.log(data);
        let msga = "Intensidad modificada al " + (<HTMLInputElement>event.target).value + "%";
        this.alerta.showSuccess(msga, "Succesfully");
      });
    }
  }

  updateIluminacion(){
    let valor_color = this.hexa
    console.log(valor_color);
    let valor_rbg: any = this.hexToRgb(valor_color);
    let red: number = 0;
    let green: number = 0;
    let blue: number = 0;
    let arregloDeArreglos: any = [];
    console.log(valor_rbg);
    for (let i = 0; i < valor_rbg.length; i += 1) {
      let pedazo = valor_rbg.slice(i, i + 1);
      arregloDeArreglos.push(pedazo);
      if (i == 0) {
        red = pedazo;
        console.log("red:" + red);
      }
      if (i == 1) {
        green = pedazo;
        console.log("green:" + green);
      }
      if (i == 2) {
        blue = pedazo;
        console.log("blue:" + blue);
      }
    }
    let Ilum : IluI;
    let id : number = 1;
    this.formIlu.setValue({
      'red' : Number(red),
      'green' : Number(green),
      'blue' : Number(blue),
    });
    Ilum = this.formIlu.value
    this.api.updateIluminacion(Ilum, id).subscribe(data =>{
      let msga = data.response;
      this.alerta.showSuccess(msga, "Succesfully");
    });
  }

 /*viewValor(event: Event) {
    let valor_color = (<HTMLInputElement>event.target).value
    console.log(valor_color);
    let valor_rbg: any = this.hexToRgb(valor_color);
    let red: number = 0;
    let green: number = 0;
    let blue: number = 0;
    let arregloDeArreglos: any = [];
    console.log(valor_rbg);
    for (let i = 0; i < valor_rbg.length; i += 1) {
      let pedazo = valor_rbg.slice(i, i + 1);
      arregloDeArreglos.push(pedazo);
      if (i == 0) {
        red = pedazo;
        console.log("red:" + red);
      }
      if (i == 1) {
        green = pedazo;
        console.log("green:" + green);
      }
      if (i == 2) {
        blue = pedazo;
        console.log("blue:" + blue);
      }
    }
    console.log("Arreglo de arreglos: ", arregloDeArreglos);
  }*/



  getValor() {
    let id = 1;
    this.api.getValor(id).subscribe(data => {
      console.log(data);
      this.valor = data.valor;
    });
  }

  hexToRgb(hex: any) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m: any, r: any, g: any, b: any) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  }

  rgbToHex(r:number, g:number, b:number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

}


















