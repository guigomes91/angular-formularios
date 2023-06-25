import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../models/estado-br';
import { Observable, map } from 'rxjs';
import { CidadeBr } from '../models/CidadeBr';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(
    private http: HttpClient
  ) { }

  getEstadosBR(): Observable<EstadoBr[]> {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
  }

  getCidadesBR(idEstado: number): Observable<CidadeBr[]> {
    return this.http.get<CidadeBr[]>('assets/dados/cidadesbr.json')
      .pipe(
        map((cidades: CidadeBr[]) => cidades.filter(c => c.estado == idEstado))
      );
  }

  getCargos() {
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'}
    ]
  }

  getTecnologias() {
    return [
      { nome: 'Java', desc: 'Java'},
      { nome: 'Javascript', desc: 'JavaScript'},
      { nome: 'PHP', desc: 'PHP'},
      { nome: 'Rubi', desc: 'Rubi'},
    ]
  }

  getNewsletter() {
    return [
      {valor: 's', desc: 'Sim'},
      {valor: 'n', desc: 'Não'}
    ]
  }
}
