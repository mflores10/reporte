import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeDate'
})
export class PipeDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
