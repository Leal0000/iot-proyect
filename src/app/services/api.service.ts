import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { responseI } from '../models/response.interface';
import { loginI } from '../models/login.interface';
import { statusI } from '../models/state.interface';
import { Observable } from 'rxjs';
import { stI } from '../models/st.interface';
import { TempI } from '../models/temperatura.interface';
import { valorI } from '../models/valor.interface';
import { vaI } from '../models/va.interface';
import { IluminacionI } from '../models/iluminacion.interface';
import { IluI } from '../models/ilum.interface';
import { code } from '../models/code.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  url:string="https://heroku-flas.herokuapp.com/";

  constructor(private http:HttpClient) { }
  
  loginUser(form:loginI):Observable<responseI>{
    let direccion = this.url + "api/login";
    return this.http.post<responseI>(direccion, form);
  }

  createUser(form:loginI):Observable<responseI>{
    let direccion = this.url + "api/register";
    return this.http.post<responseI>(direccion, form);
  }

  codeUser(form:code):Observable<responseI>{
    let direccion = this.url + "api/code";
    return this.http.post<responseI>(direccion, form);
  }
  
  state(id:any):Observable<statusI>{
    let direccion = this.url + "api/device/" + id;
    return this.http.get<statusI>(direccion);
  }

  updateState(form:stI, id:any):Observable<responseI>{
    let direccion = this.url + "api/device/" + id;
    return this.http.put<responseI>(direccion, form); 
  }
  updateValor(form:vaI, id:number):Observable<responseI>{
    let direccion = this.url + "api/intensidad/" + id;
    return this.http.put<responseI>(direccion, form);
  }
  updateIluminacion(form:IluI, id:number):Observable<responseI>{
    let direccion = this.url + "api/iluminacion_rgb/" + id;
    return this.http.put<responseI>(direccion, form);
  }
  getTemperature():Observable<TempI>{
    let direccion = this.url + "temperatura";
    return this.http.get<TempI>(direccion);
  }
  getTemperatureReal():Observable<TempI>{
    let direccion = this.url + "temperatura_real";
    return this.http.get<TempI>(direccion);
  }
  getValor(id:number):Observable<valorI>{
    let direccion = this.url + "api/intensidad/" + id;
    return this.http.get<valorI>(direccion);
  }
  getIluminacion(id:number):Observable<IluminacionI>{
    let direccion = this.url + "api/iluminacion_rgb/" + id;
    return this.http.get<IluminacionI>(direccion);
  }

}
