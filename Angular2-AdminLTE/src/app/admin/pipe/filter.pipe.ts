import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(list: any[], filterField: string[], keyword:string): any {

        if(!filterField || !keyword){
            return list;
        }

        return list.filter( item =>{
            let key = keyword.toLowerCase();
            for (let i of filterField)
            {
                if(item[i].toString().toLowerCase().indexOf(key) >= 0)
                    return 1;
            }
            return 0;
        });
    }

}
