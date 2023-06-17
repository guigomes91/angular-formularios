import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  estados: Object = new Object();

  constructor(
    private http: HttpClient
  ) { }

  getEstadosBR() {
    return this.http.get('assets/dados/estadosbr.json')
      .subscribe(res => {
        this.estados = res;
      });
  }
}
