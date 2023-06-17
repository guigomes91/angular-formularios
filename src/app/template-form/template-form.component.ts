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

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  onSubmit(formulario: any) {
    console.log(formulario.value);

    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
      .subscribe(dados => {
        console.log(dados);
        formulario.form.reset();
      });
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

  consultaCEP(cep: any, form: any) {
    //Nova variável "cep" somente com dígitos.
    const cepReplace = cep.replace(/\D/g, '');
    if (cepReplace != "") {
      let validacep = /^\d{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cepReplace)) {
        this.resetaDadosForm(form);
        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .subscribe(dados => this.populaDadosForm(dados, form));
      }
    }
  }

  populaDadosForm(dados: any, formulario: any) {
    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
}
