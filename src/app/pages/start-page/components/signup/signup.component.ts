import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  enteredName = '';
  enteredEmail = '';
  enteredTel = '';
  enteredPersonalNumber = '';
  enteredPassword = '';

  register() {
    let userInfo = {
      name: this.enteredName,
      email: this.enteredEmail,
      tel: this.enteredTel,
      personalNumber: this.enteredPersonalNumber,
      password: this.enteredPassword
    }
  }
}
