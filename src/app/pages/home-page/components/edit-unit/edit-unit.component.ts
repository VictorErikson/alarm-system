import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Unit } from '../../home-page.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-unit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-unit.component.html',
  styleUrl: './edit-unit.component.scss'
})
export class EditUnitComponent {
  @Output() showUnits = new EventEmitter<void>();
  @Input() unit!: Unit;
  // newUnit = signal(this.unit)
  editUnitFailed = signal(false);
  emptyField = signal(false);
  enteredName: string = '';
  // enteredUserName: string = '';
  // enteredName=this.newUnit.unitName;
  editedUserNames: { [userId: number]: string } = {};
  

  ngOnInit(): void {
    this.enteredName = this.unit.unitName;

    this.unit.unitUsers.forEach(user => {
      this.editedUserNames[user.userId] = user.user;
    });

  }
  // console.log(editedUserNames);
  editUnit() {
    
  }
}
