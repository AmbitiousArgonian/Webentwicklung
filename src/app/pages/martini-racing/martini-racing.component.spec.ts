import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MartiniRacingComponent } from './martini-racing.component';

describe('MartiniRacingComponent', () => {
  let component: MartiniRacingComponent;
  let fixture: ComponentFixture<MartiniRacingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MartiniRacingComponent]
    });
    fixture = TestBed.createComponent(MartiniRacingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
