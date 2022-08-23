import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cmsPipe'
})
export class CmsPipePipe implements PipeTransform {

  transform(map: Map<String,Number>, ...args: unknown[]): unknown {
    console.log('pipe' + map);
    let i = 0;
    let res : string[]= [];
    for (const [city, value] of map) {
      if(i >2){
        break;
      }
      res.push(city + ': ' + value +' times.');
      console.log(city, value);
      i++;
    }
    return res;
    // let res = [];
    // let i = 0;
    // for(const [city,value] of Object.entries(map)){
    //   console.log(city + ' ' + value)
    //   if(i>2){
    //     break;
    //   }
    //   res.push(city + ' ' + value);
    //   i++;
    // }
    // console.log(res);
    // return res;
  }

}
