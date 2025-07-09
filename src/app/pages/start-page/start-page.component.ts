import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";

@Component({
  standalone: true,
  selector: 'app-start-page',
  imports: [CommonModule, LoginComponent, SignupComponent, LoginComponent],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {
  showLogin = true;

  toggleForm(): void {
    this.showLogin =!this.showLogin;
  }

  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.auth.login(this.email, this.password)
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/home']);
        } else {
          // show a login error message
        }
      });
  }
// login() {
//   this.auth.login(this.username, this.password)
//     .subscribe(success => {
//       if (success) {
//         this.router.navigate(['/home']);
//       } else {
//         // show error
//       }
//     });
// }
}
