import { Component, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  enteredEmail=signal('');
  enteredPassword=signal('');
  loginFailed = signal(false);

  constructor(private auth: AuthService, private router: Router) {
    effect(() => {
    this.enteredEmail();
    this.enteredPassword();
    this.loginFailed.set(false);
  });
  }

  login() {
    const email = this.enteredEmail().trim();
    const password = this.enteredPassword().trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/.test(email);

    if (!email || password.length < 6 || !isValidEmail) {
      this.loginFailed.set(true);
      return;
    }

    //logga navigera OM inlogg lyckas

    this.auth.login(email, password).subscribe(success => {
      console.log(email, password);
      if (success) {
        this.router.navigate(['/home']);
      } else {
        this.loginFailed.set(true);
      }
    });
    // console.log(email, password);
    // this.router.navigate(['/home']);
      
  }
}
