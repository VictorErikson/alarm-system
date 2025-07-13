import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AddCentralUnitComponent } from "./components/add-central-unit/add-central-unit.component";
import { HeaderComponent } from "../../components/header/header.component";
import { ApiService } from '../../services/api.service';
import { EditUnitComponent } from './components/edit-unit/edit-unit.component';
import { AddUnitComponent } from './components/add-unit/add-unit.component';

@Component({
  standalone: true,
  selector: 'app-home-page',
  imports: [CommonModule, AddCentralUnitComponent, HeaderComponent, EditUnitComponent, AddUnitComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

private api = inject(ApiService);
  units = signal([
    {
      unitId: 123234,
      unitName: "Frihamnen",
      locked: true,
      unitUsers: [
        {
          user: "Ture",
          userId: 1242,  
          avatar: 1
        },
        {
          user: "Birgitta",
          userId: 3773,  
          avatar: 4
        },
        {
          user: "Peter",
          userId: 3456,  
          avatar: 1
        }
      ]
    },
    {
      unitId: 24343,
      unitName: "Liljeholmen",
      locked: false,
      unitUsers: [
        {
          user: "Victor",
          userId: 98346,  
          avatar: 6
        },
        {
          user: "Laura",
          userId: 34776, 
          avatar: 3 
        }
      ]
    }
  ]);

 
  // units = this.api.getDataSignal;
  //borde vara såhär typ?
  // units = this.api.getDataSignal.units;
  // userId = this.api.getDataSignal.userId


  private destroyRef = inject(DestroyRef);
  private intervalId: ReturnType<typeof setInterval>;

  constructor() {
    this.intervalId = setInterval(() => {
      this.api.fetch();
    }, 30_000);

    this.destroyRef.onDestroy(() => clearInterval(this.intervalId));
  }

  //switching DOM-components

  currentView = signal<'units' | 'editUnit' | 'addUnit'>('units');
  selectedUnit = signal<Unit | null>(null);
  
  showUnits() {
    this.currentView.set('units');
  }

  showEditUnit(unit: Unit) {
    this.selectedUnit.set(unit);
    this.currentView.set('editUnit');
  }

  showAddUnit() {
    this.currentView.set('addUnit');
  }





  // send() {
  //   this.api.postData({ foo: 'bar' }).subscribe();
  // }
}

 export type Unit = {
  unitId: number;
  unitName: string;
  locked: boolean;
  unitUsers: {
    user: string;
    userId: number;
    avatar: number;
  }[];
};


