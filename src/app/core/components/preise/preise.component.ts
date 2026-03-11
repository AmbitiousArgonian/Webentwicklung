import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preise.component.html',
  styleUrls: ['./preise.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingComponent {

}