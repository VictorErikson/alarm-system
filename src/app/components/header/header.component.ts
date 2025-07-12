import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  @Output() showUnits = new EventEmitter<void>();

  logout(): void {
    this.authService.logout();
  }
}
