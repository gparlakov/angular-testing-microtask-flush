import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from './auth.service';


@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent {
  @Input() name: string;

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.auth.getUser().then(u => {
      if(u === User.Empty) {
        this.router.navigate(['/login'])
      }
    })
  }
}