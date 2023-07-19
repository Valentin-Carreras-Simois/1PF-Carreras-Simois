import {
    AbstractControl,
    FormControl,
    ValidationErrors,
    ValidatorFn,
  } from '@angular/forms';
  
  export function noHotmailValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      if (control instanceof FormControl) {
        if (
          typeof control.value === 'string' &&
          control.value?.toLowerCase().includes('@hotmail')
        ) {
          return {
            noHotmail: true,
          };
        }
      }
  
      return null;
    };
  }