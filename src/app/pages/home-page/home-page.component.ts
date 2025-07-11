import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddCentralUnitComponent } from "./components/add-central-unit/add-central-unit.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  standalone: true,
  selector: 'app-home-page',
  imports: [CommonModule, AddCentralUnitComponent, HeaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
