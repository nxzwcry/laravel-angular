import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trans'
})
export class TransPipe implements PipeTransform {

  transform(value: number, list: string[]): any {
    if(list[value])
    {
      return list[value];
    }
    else{
      return "未定义";
    }
  }

}
