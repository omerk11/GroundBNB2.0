import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'userNameCapital'
})
export class UserNameCapitalPipe implements PipeTransform {

    transform(username: string): any {
        let res = username.split(" ");
        let first = res[0].charAt(0).toUpperCase() + res[0].slice(1);
        let last = res[1].charAt(0).toUpperCase() + res[1].slice(1);

        return first + ' ' + last;
    
        
    }
}