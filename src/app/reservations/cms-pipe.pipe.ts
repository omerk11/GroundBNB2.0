import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cmsPipe'
})
export class CmsPipePipe implements PipeTransform {

  transform(map: Map<String,Number>, ...args: unknown[]): unknown {
    // console.log('pipe' + map);
    let i = 0;
    let tmp = '<div>';
    for (const [city, value] of map) {
      if(i >2){
        break;
      }
      tmp+=`${i+1}) ${city}: ${value} times.`;
      tmp+='<br>';
      i++;
    }
    tmp+='</div>'
    return tmp;
  }

}
