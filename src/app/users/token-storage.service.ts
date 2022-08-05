import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }
  signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  public getMyId()
  {
    return this.getUser().id;
  }
  public isAdmin()
  {
    let user = this.getUser();
    console.log();
    if(Object.keys(user).length === 0)
    {
      return false;
    }
    return user.roles.includes("ROLE_ADMIN");
  }

  public isLoggedIn(){
    let token = this.getToken();
    if(token){
      return true;
    }
    return false;
  }
}