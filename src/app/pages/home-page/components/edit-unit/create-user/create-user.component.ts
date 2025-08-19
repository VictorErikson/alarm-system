import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Unit } from '../../../home-page.component';
import { SvgAvatarComponent } from "../../../../../shared/svg-avatar.component";

@Component({
  selector: 'app-create-user',
  imports: [CommonModule, FormsModule, SvgAvatarComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {

 @Input() user!: {
    userId: number;
    user: string;
    avatar: number;
    pincode: string;
    tag: boolean;
  };
  @Input() unit!: Unit;
  @Output() showEditUnit = new EventEmitter<Unit>();

  editUserFailed = signal(false);
  showPassword = false;
  enteredName: string = '';
  enteredPass: string = '';
  selectedAvatar: number = 1;
  dropdownOpen = false;
  tag: boolean = false;


  avatars = [
    { value: 1, label: 'Avatar 1' },
    { value: 2, label: 'Avatar 2' },
    { value: 3, label: 'Avatar 3' },
    { value: 4, label: 'Avatar 4' },
    { value: 5, label: 'Avatar 5' },
    { value: 6, label: 'Avatar 6' },
  ];

  selectAvatar(value: number) {
  this.selectedAvatar = value;
  this.dropdownOpen = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  
  returnToUnit() {
    this.showEditUnit.emit(this.unit);
  }

  ngOnInit(): void {
    this.enteredName = this.user.user;
    this.enteredPass = this.user.pincode;
    this.selectedAvatar = this.user.avatar;
    this.tag = this.user.tag;
  }

  addUser() {
    
  }
}
