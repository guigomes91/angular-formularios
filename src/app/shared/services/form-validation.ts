import { FormArray, FormControl } from '@angular/forms';

export class FormValidations {
  static requiredMinCheckbox(min = 1): any {
    const validator = (formArray: FormArray) => {
      const totalChecked = formArray.controls
        .map((v) => v.value)
        .reduce((total, current) => (current ? total + current : total), 0);
      return totalChecked >= min ? null : { required: true };
    };
    return validator;
  }

  static cepValidator(control: FormControl) {

    const cep = control.value;
    if (cep && cep !== '') {
      const validacep = /^\d{8}$/;
      return validacep.test(cep) ? null : { cepInvalido : true };
    }

    return null;
  }
}
