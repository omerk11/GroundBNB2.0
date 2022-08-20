import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'userNameCapital'
})
export class UserNameCapitalPipe implements PipeTransform {

    transform(username: string): any {
        
    }
}