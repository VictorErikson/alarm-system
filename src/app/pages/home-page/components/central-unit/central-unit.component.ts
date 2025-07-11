import { Component, signal, inject, DestroyRef } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-central-unit',
  standalone: true,
  imports: [],
  templateUrl: './central-unit.component.html',
  styleUrl: './central-unit.component.scss'
})
export class CentralUnitComponent {
  locked = signal(false);

  private api = inject(ApiService);
  data = this.api.getDataSignal;

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
