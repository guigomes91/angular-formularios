import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  };

  onSubmit(formulario: any) {
    console.log(formulario.value);
  }

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep: any) {
    //Nova variável "cep" somente com dígitos.
    var cep = cep.replace(/\D/g, '');

    if (cep != "") {
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .subscribe(dados => console.log(dados));
      }
    }
  }

}
