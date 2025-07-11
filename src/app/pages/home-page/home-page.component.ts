import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AddCentralUnitComponent } from "./components/add-central-unit/add-central-unit.component";
import { HeaderComponent } from "../../components/header/header.component";
import { ApiService } from '../../services/api.service';

@Component({
  standalone: true,
  selector: 'app-home-page',
  imports: [CommonModule, AddCentralUnitComponent, HeaderComponent],
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
        },
        {
          user: "Laura",
          userId: 34776,  
        }
      ]
    }
  ]);
  // units = this.api.getDataSignal;

  private destroyRef = inject(DestroyRef);
  private intervalId: ReturnType<typeof setInterval>;

  constructor() {
    this.intervalId = setInterval(() => {
      this.api.fetch();
    }, 30_000);

    this.destroyRef.onDestroy(() => clearInterval(this.intervalId));
  }
  // send() {
  //   this.api.postData({ foo: 'bar' }).subscribe();
  // }
}


