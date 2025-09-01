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
  // userId = "";
  token = sessionStorage.getItem("jwt");
  

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
    
    // console.log(`{serial: ${id}, token: ${this.token}, name: ${name}}`);
    this.api.postCU({ serial: id, token: this.token, name }).subscribe({
      next: (response: string) => {
        this.addUnitFailed.set(false);
        console.log('Response:', response);
        this.showUnits.emit()
      },
      error: (err) => {
        console.error('Error occurred:', err);
        this.addUnitFailed.set(true);
      }
    });
    // this.api.postCU({ "serial": id, "token": this.token, "name": name}).subscribe({
    //   next: (response) => {
    //     this.addUnitFailed.set(false);
    //     console.log('Response:', response);
    //   },
    //   error: (err) => {
    //     console.error('Error occurred:', err);
    //     this.addUnitFailed.set(true);
    //   },
    //   complete: () => {
    //     console.log('Request completed.');
    //     this.addUnitFailed.set(false);
    //   }
    // });

  }
}
