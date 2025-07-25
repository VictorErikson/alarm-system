import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-central-unit',
  imports: [],
  templateUrl: './add-central-unit.component.html',
  styleUrl: './add-central-unit.component.scss'
})
export class AddCentralUnitComponent {

  @Output() showAddUnit = new EventEmitter<void>();
}
