import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  getUser(): Promise<User> {
    // probably make a xhr
    return Promise.resolve(User.Empty);
  } 
}

export class User {
  constructor(public name: string) {}

  static readonly Empty: User = new User(undefined);
}