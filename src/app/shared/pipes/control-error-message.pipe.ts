import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'controlErrorMessage'
})
export class ControlErrorMessagePipe implements PipeTransform {

  transform(error: { key: string, value: any }, ...args: unknown[]): unknown {
    const errorMessages: Record<string, string> = {
      required: 'Este campo es requerido',
      noHotmail: 'Debe ser un email de tipo Gmail',
      minlength: 'Debe ser de al menos 3 caracteres'
    };

    return errorMessages[error.key] || 'Campo invalido';
  }

}