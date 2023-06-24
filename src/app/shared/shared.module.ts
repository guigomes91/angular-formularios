import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormDebugComponent, CampoControlErroComponent, ErrorMsgComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [FormDebugComponent, CampoControlErroComponent, ErrorMsgComponent]
})
export class SharedModule {}
