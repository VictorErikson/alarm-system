import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-add-unit',
  imports: [FormsModule],
  templateUrl: './add-unit.component.html',
  styleUrl: './add-unit.component.scss'
})
export class AddUnitComponent {
  private api = inject(ApiService);
  // units = this.api.postData;

 
  // userId = this.api.getDataSignal.userId;
  userId = "";
  

  addUnitFailed = signal(false);
  emptyIdField = signal(false);
  emptyNameField = signal(false);
  enteredId=signal('');
  enteredName=signal('');


  addUnit() {}

  @Output() showUnits = new EventEmitter<void>();

  addNewUnit(){
    const id = this.enteredId().trim();
    const name = this.enteredName().trim();

    this.addUnitFailed.set(false);
    this.emptyIdField.set(false);
    this.emptyNameField.set(false);

    if (!id || !name){
      if(!id){
        this.emptyIdField.set(true);
      }
      if (!name){
        this.emptyNameField.set(true);

      }
      return;
    }
    

    this.api.postData({ id, userId: this.userId, name}).subscribe({
      next: (response) => {
        this.addUnitFailed.set(true);
        console.log('Response:', response);
      },
      error: (err) => {
        console.error('Error occurred:', err);
        this.addUnitFailed.set(true);
      },
      complete: () => {
        console.log('Request completed.');
        this.addUnitFailed.set(true);
      }
    });

  }
}
