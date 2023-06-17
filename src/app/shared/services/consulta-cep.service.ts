import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCep(cep: string) {
    //Nova variável "cep" somente com dígitos.
    const cepReplace = cep?.replace(/\D/g, '');

    if (cepReplace != '') {
      let validacep = /^\d{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cepReplace)) {
        return this.http
          .get(`//viacep.com.br/ws/${cep}/json`);
      }
    }

    return of({});
  }
}
