import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trans'
})

export class TransPipe implements PipeTransform {

  /**
   *
   * @param value
   * @param {string[]} list
   * @param {string} index
   * @param {string} show
   * @returns {string}
   */
  transform(value: any, list: string[], index: string, show: string): any {
    for(let item of list){
      if (item[index] == value){
        return item[show];
      }
    }
    return "未定义";
  }

}
