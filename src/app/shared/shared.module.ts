import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from './input-field/input-field.component';
import { BaseFormComponent } from './base-form/base-form.component';

@NgModule({
  declarations: [FormDebugComponent, CampoControlErroComponent, ErrorMsgComponent, InputFieldComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  exports: [FormDebugComponent, CampoControlErroComponent, ErrorMsgComponent, InputFieldComponent]
})
export class SharedModule {}
