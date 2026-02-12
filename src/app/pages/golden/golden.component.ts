import { Component } from '@angular/core';
import { GoldenTwentiesDetailComponent } from 'src/app/golden-twenties-detail/golden-twenties-detail.component';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { FooterComponent } from '../../core/components/footer/footer.component';

@Component({
  selector: 'golden',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, GoldenTwentiesDetailComponent],
  templateUrl: './golden.component.html',
})
export class goldenComponent {}