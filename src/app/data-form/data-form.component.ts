import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, EMPTY, map, Observable, switchMap, tap, empty } from 'rxjs';

import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { FormValidations } from '../shared/services/form-validation';
import { VerificaEmailService } from './services/verifica-email.service';
import { CidadeBr } from '../shared/models/CidadeBr';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  //estados!: Observable<EstadoBr[]>;
  estados!: EstadoBr[];
  cidades!: CidadeBr[];
  cargos: any[] = [];
  tecnologias: any[] = [];
  newsletterOp: any[] = [];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {
    super();
  }

  ngOnInit(): void {
    //this.verificaEmailService.verificarEmail('email@email.com').subscribe();

    //this.estados = this.dropDownService.getEstadosBR();

    this.dropDownService.getEstadosBR()
    .subscribe(dados => this.estados = dados);

    this.cargos = this.dropDownService.getCargos();
    this.tecnologias = this.dropDownService.getTecnologias();
    this.newsletterOp = this.dropDownService.getNewsletter();

    this.formulario = this.formBuilder.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      email: [
        null,
        [Validators.required, Validators.email],
        this.validarEmail.bind(this),
      ],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),

      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks(),
    });

    this.formulario.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap((value: any) => console.log('valor do CEP: ', value)),
        switchMap(status => status === 'VALID' ? this.cepService.consultaCep(this.formulario.get('endereco.cep')?.value)
        : EMPTY)
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});

      this.formulario.get('endereco.estado')?.valueChanges
        .pipe(
          tap(estado => console.log('Novo estado: ', estado)),
          map(estado => this.estados.filter(e => e.sigla === estado)),
          map(estados => estados && estados.length > 0 ? (estados[0].id) : EMPTY),
          switchMap((estadoId:any) => this.dropDownService.getCidadesBR(estadoId)),
          tap(console.log)
        )
        .subscribe(cidades => this.cidades = cidades);

      //this.dropDownService.getCidadesBR(8).subscribe(console.log);
  }

  buildFrameworks() {
    const values = this.frameworks.map((v) => new FormControl(false));
    return this.formBuilder.array(
      values,
      FormValidations.requiredMinCheckbox(1)
    );
  }

  submit() {
    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: any, i: any) => (v ? this.frameworks[i] : null))
        .filter((v: any) => v !== null),
    });

    console.log(valueSubmit);

    if (this.formulario.valid) {
      this.http
        .post('https://httpbin.org/post', JSON.stringify(valueSubmit))
        .subscribe(
          () => {
            //reseta o form
            this.resetar();
          },
          (error: any) => alert('erro')
        );
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep')?.value;

    if (cep != null && cep !== '') {
      this.cepService
        .consultaCep(cep)
        ?.subscribe((dados) => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });

    this.formulario.get('nome')?.setValue('Guilherme');
  }

  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    });
  }

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2
      ? obj1.nome === obj2.nome && obj1.nivel === obj2.nivel
      : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias')?.setValue(['Java', 'Javascript', 'PHP']);
  }

  getControls() {
    return (this.formulario.get('frameworks') as FormArray).controls;
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService
      .verificarEmail(formControl.value)
      .pipe(
        map((emailExiste) => (emailExiste ? { emailInvalido: true } : null))
      );
  }
}
