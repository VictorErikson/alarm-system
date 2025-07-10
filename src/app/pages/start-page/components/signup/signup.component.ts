import { Component, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupDto, UserService } from '../../../../services/user.service';

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

  enteredSurname = signal('');
  surnameFailed = signal(false);

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

  constructor(private userService: UserService,
  private router: Router) {
    effect(() => {
      if (this.enteredName().trim()) this.nameFailed.set(false);
    });
    effect(() => {
      if (this.enteredSurname().trim()) this.surnameFailed.set(false);
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
      if (/^\d{10}$/.test(this.enteredPersonalNumber().trim())) {
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
    this.enteredPersonalNumber.set(value.replace(/\D/g, ''));
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
    if (!/^\d{10}$/.test(p)) {
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
    this.surnameFailed.set(false);
    this.emailFailed.set(false);
    this.telFailed.set(false);
    this.personalNumberFailed.set(false);
    this.addressFailed.set(false);
    this.passFailed.set(false);
    this.repetedPassFailed.set(false);

    // empty‐field check
    const fields = [
      { val: this.enteredName,         fail: this.nameFailed },
      { val: this.enteredSurname,      fail: this.surnameFailed },
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
    surname: this.enteredSurname(),
    email: this.enteredEmail(),
    phone: this.enteredTel(),
    personalNumber: this.enteredPersonalNumber(),
    address: this.enteredAddress(),
    password: this.enteredPassword(),
  };

  this.userService.signup(dto).subscribe({
    next: () => this.router.navigate(['/home']),
    error: err => {
      // handle signup error, e.g. show a message
      console.error(err);
    }
  });
  }
}



// import { Component, signal, effect } from '@angular/core';
// import { FormsModule } from '@angular/forms';


// @Component({
//   selector: 'app-signup',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './signup.component.html',
//   styleUrl: './signup.component.scss'
// })
// export class SignupComponent {
//   enteredName = signal('');
//   nameFailed = signal(false);
//   enteredSurname = signal('');
//   surnameFailed = signal(false);
//   enteredEmail = signal('');
//   emailFailed = signal(false);
//   enteredTel = signal('');
//   telFailed = signal(false);
//   enteredPersonalNumber = signal('');
//   personalNumberFailed = signal(false);
//   enteredAddress = signal('');
//   addressFailed = signal(false);
//   enteredPassword = signal('');
//   passFailed = signal(false);
//   repetedPassword = signal('');
//   repetedPassFailed = signal(false);

//   constructor() {
//   effect(() => {
//     if (this.enteredName().trim() !== '') this.nameFailed.set(false);
//   });

//   effect(() => {
//     if (this.enteredSurname().trim() !== '') this.surnameFailed.set(false);
//   });

//   effect(() => {
//     const email = this.enteredEmail().trim();
//     if (/^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/.test(email)) this.emailFailed.set(false);
//   });

// effect(() => {
//     const t = this.enteredTel().trim();
//     const onlyAllowed = /^[\d+\-\s]+$/.test(t);
//     const digitCount = t.replace(/\D/g, '').length;
//     if (onlyAllowed && digitCount >= 10) {
//       this.telFailed.set(false);
//     }
//   });

//   effect(() => {
//     const p = this.enteredPersonalNumber().trim();
//     if (/^\d{10}$/.test(p)) {
//       this.personalNumberFailed.set(false);
//     }
//   });

//   effect(() => {
//     if (this.enteredAddress().trim() !== '') this.addressFailed.set(false);
//   });

//   effect(() => {
//     const password = this.enteredPassword().trim();
//     if (password.length >= 8 && /[!@#$%^&*()?+]/.test(password) && /\d/.test(password)) {
//       this.passFailed.set(false);
//     }
//   });

//   effect(() => {
//     if (this.repetedPassword().trim() === this.enteredPassword().trim()) {
//       this.repetedPassFailed.set(false);
//     }
//   });
// }


//   validateInputs(): boolean {
//     const name = this.enteredName().trim();
//     const surname = this.enteredSurname().trim();
//     const email = this.enteredEmail().trim();
//     const phonenumber = this.enteredTel().trim();
//     const personalNumber = this.enteredPersonalNumber().trim();
//     const address = this.enteredAddress().trim();
//     const password = this.enteredPassword().trim();
//     const repetedPassword = this.repetedPassword().trim();
//     const phoneRaw = this.enteredTel().trim();
//     const pnRaw    = this.enteredPersonalNumber().trim();

//   let hasErrors = false;

//   if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/.test(email)) {
//     this.emailFailed.set(true);
//     hasErrors = true;
//   }
//   if (
//     !/^[\d+\-\s]+$/.test(phoneRaw) ||
//     phoneRaw.replace(/\D/g, '').length < 10
//   ) {
//     this.telFailed.set(true);
//     hasErrors = true;
//   }

//   if (!/^\d{10}$/.test(pnRaw)) {
//     this.personalNumberFailed.set(true);
//     hasErrors = true;
//   }

//   if (password.length < 8 || !/[!@#$%^&*()?+]/.test(password) || !/\d/.test(password)) {
//     this.passFailed.set(true);
//     hasErrors = true;
//   }

//   if (password !== repetedPassword) {
//     this.repetedPassFailed.set(true);
//     hasErrors = true;
//   }

//   return hasErrors;
// }



//   register() {
    

//     const fields = [
//     { value: this.enteredName, fail: this.nameFailed },
//     { value: this.enteredSurname, fail: this.surnameFailed },
//     { value: this.enteredEmail, fail: this.emailFailed },
//     { value: this.enteredTel, fail: this.telFailed },
//     { value: this.enteredPersonalNumber, fail: this.personalNumberFailed },
//     { value: this.enteredAddress, fail: this.addressFailed },
//     { value: this.enteredPassword, fail: this.passFailed },
//     { value: this.repetedPassword, fail: this.repetedPassFailed },
//     ];

//     let hasEmptyField = false;

//     for (const field of fields) {
//       const isEmpty = field.value().trim() === '';
//       field.fail.set(isEmpty);
//       if (isEmpty) hasEmptyField = true;
//     }
    

//     if (hasEmptyField) return;
//     if (this.validateInputs()) return;
   
//     // let userInfo = {
//     //    name: this.enteredName,
//     //    email: this.enteredEmail,
//     //    phonenumber: this.enteredTel,
//     //    personalNumber: this.enteredPersonalNumber,
//     //    address: this.enteredAddress,
//     //    password: this.enteredPassword
//     //  }
//   }
// }
