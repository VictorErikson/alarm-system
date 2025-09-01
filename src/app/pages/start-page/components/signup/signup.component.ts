import { Component, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupDto, UserService } from '../../../../services/user.service';
import { switchMap } from 'rxjs';
import { AuthService } from '../../../../core/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  enteredName = signal('');
  nameFailed = signal(false);

  enteredEmail = signal('');
  emailFailed = signal(false);

  enteredTel = signal('');
  telFailed = signal(false);

  enteredPersonalNumber = signal('');
  personalNumberFailed = signal(false);

  enteredAddress = signal('');
  addressFailed = signal(false);

  enteredPassword = signal('');
  passFailed = signal(false);

  repetedPassword = signal('');
  repetedPassFailed = signal(false);

  constructor(
  private userService: UserService,
  private auth: AuthService,
  private router: Router
  ) {
    effect(() => {
      if (this.enteredName().trim()) this.nameFailed.set(false);
    });
    effect(() => {
      if (/^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/.test(this.enteredEmail().trim())) {
        this.emailFailed.set(false);
      }
    });
    effect(() => {
      const t = this.enteredTel().trim();
      const ok = /^[\d+\-\s]+$/.test(t) && t.replace(/\D/g, '').length >= 10;
      if (ok) this.telFailed.set(false);
    });
    effect(() => {
      if (/^\d{8}-\d{4}$/.test(this.enteredPersonalNumber().trim())) {
        this.personalNumberFailed.set(false);
      }
    });
    effect(() => {
      if (this.enteredAddress().trim()) this.addressFailed.set(false);
    });
    effect(() => {
      const pw = this.enteredPassword().trim();
      if (
        pw.length >= 8 &&
        /[!@#$%^&*()?+]/.test(pw) &&
        /\d/.test(pw)
      ) {
        this.passFailed.set(false);
      }
    });
    effect(() => {
      if (this.repetedPassword().trim() === this.enteredPassword().trim()) {
        this.repetedPassFailed.set(false);
      }
    });
  }

  onTelChange(value: string) {
    this.enteredTel.set(value.replace(/[^0-9+\-\s]/g, ''));
  }

  onPersonalNumberChange(value: string) {
     // allow digits and hyphen
    let s = value.replace(/[^\d-]/g, '');

    // keep only the first hyphen (optional but nice)
    const i = s.indexOf('-');
    if (i !== -1) s = s.slice(0, i + 1) + s.slice(i + 1).replace(/-/g, '');

    this.enteredPersonalNumber.set(s);
  }

  private validateInputs(): boolean {
    let hasErrors = false;

    const email = this.enteredEmail().trim();
    if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/.test(email)) {
      this.emailFailed.set(true);
      hasErrors = true;
    }

    const t = this.enteredTel().trim();
    if (!/^[\d+\-\s]+$/.test(t) || t.replace(/\D/g, '').length < 10) {
      this.telFailed.set(true);
      hasErrors = true;
    }

    const p = this.enteredPersonalNumber().trim();
    if (!/^\d{8}-\d{4}$/.test(p)) {
      this.personalNumberFailed.set(true);
      hasErrors = true;
    }

    const pw = this.enteredPassword().trim();
    if (
      pw.length < 8 ||
      !/[!@#$%^&*()?+]/.test(pw) ||
      !/\d/.test(pw)
    ) {
      this.passFailed.set(true);
      hasErrors = true;
    }

    if (this.repetedPassword().trim() !== pw) {
      this.repetedPassFailed.set(true);
      hasErrors = true;
    }

    return hasErrors;
  }

  register() {
    // reset all
    this.nameFailed.set(false);
    this.emailFailed.set(false);
    this.telFailed.set(false);
    this.personalNumberFailed.set(false);
    this.addressFailed.set(false);
    this.passFailed.set(false);
    this.repetedPassFailed.set(false);

    // empty‐field check
    const fields = [
      { val: this.enteredName,         fail: this.nameFailed },
      { val: this.enteredEmail,        fail: this.emailFailed },
      { val: this.enteredTel,          fail: this.telFailed },
      { val: this.enteredPersonalNumber, fail: this.personalNumberFailed },
      { val: this.enteredAddress,      fail: this.addressFailed },
      { val: this.enteredPassword,     fail: this.passFailed },
      { val: this.repetedPassword,     fail: this.repetedPassFailed },
    ];
    let hasEmpty = false;
    for (const { val, fail } of fields) {
      if (val().trim() === '') {
        fail.set(true);
        hasEmpty = true;
      }
    }

    // format check
    const hasFormat = this.validateInputs();

    if (hasEmpty || hasFormat) return;

    const dto: SignupDto = {
    name: this.enteredName(),
    email: this.enteredEmail(),
    phone: this.enteredTel(),
    personalNumber: this.enteredPersonalNumber(),
    address: this.enteredAddress(),
    password: this.enteredPassword(),
  };

  // console.log("data from signup: " + dto);
  this.userService.signup(dto).pipe(
  // signup succeeded -> immediately try login with the same credentials
    switchMap(() => this.auth.login(dto.email.trim(), dto.password.trim()))
    ).subscribe({
      next: (ok: boolean) => {
        if (ok) this.router.navigate(['/home']);
        else    console.error('Auto-login failed after signup');
      },
      error: err => {
        // signup failed (login errors are mapped to false inside AuthService)
        console.error('Signup error:', err);
      }
  });
  // this.userService.signup(dto).subscribe({
  //   next: (msg: string) => {
  //     console.log('Server says:', msg); 
  //     this.router.navigate(['/home']);
  //   },
  //   error: err => {
  //     console.error(err);

  //   }
  // });

  // this.userService.signup(dto).subscribe({
  //   next: () => this.router.navigate(['/home']),
  //   error: err => {
  //     // handle signup error, e.g. show a message
  //     console.error(err);
  //   }
  // });
  // }
}
}

