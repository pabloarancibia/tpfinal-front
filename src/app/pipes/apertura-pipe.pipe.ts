import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aperturaPipe'
})
export class AperturaPipePipe implements PipeTransform {

  transform(value: number): string {
    let estado = '';
    if (value === 0) { estado = 'Cerrado'; }
    else if (value === 1) { estado = 'Abierto'; }
    return estado;
  }

}
