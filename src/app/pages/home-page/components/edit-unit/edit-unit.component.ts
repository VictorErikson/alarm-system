import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Unit } from '../../home-page.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-unit',
  imports: [FormsModule],
  templateUrl: './edit-unit.component.html',
  styleUrl: './edit-unit.component.scss'
})
export class EditUnitComponent {
  @Output() showUnits = new EventEmitter<void>();
  @Input() unit!: Unit;

  editUnitFailed = signal(false)
  emptyField = signal(false);

  editUnit() {

  }
}
