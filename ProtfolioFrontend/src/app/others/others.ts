import { Component } from '@angular/core';

@Component({
  selector: 'app-others',
  imports: [],
  templateUrl: './others.html',
  styleUrl: './others.css'
})
export class Others {
  showLogin = true;   // true = Login page | false = Register page

  toggleForm() {
    this.showLogin = !this.showLogin;
  }

}
