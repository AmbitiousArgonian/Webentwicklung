import { Component } from '@angular/core';
import { MartiniRacingComponent } from "../martini-racing/martini-racing.component";
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { FooterComponent } from '../../core/components/footer/footer.component';


@Component({
  selector: 'racing',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, MartiniRacingComponent],
  templateUrl: './racing.component.html',
})
export class racingComponent {}