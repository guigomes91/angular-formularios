import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: 'Guilherme',
    email: 'guilherme@email.com'
  };

  onSubmit(formulario: any) {
    console.log(formulario.value);
    console.log(this.usuario);
  }

  constructor(
  ) { }

  ngOnInit() {
  }

}
