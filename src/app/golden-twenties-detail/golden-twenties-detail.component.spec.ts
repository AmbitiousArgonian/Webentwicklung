import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldenTwentiesDetailComponent } from './golden-twenties-detail.component';

describe('GoldenTwentiesDetailComponent', () => {
  let component: GoldenTwentiesDetailComponent;
  let fixture: ComponentFixture<GoldenTwentiesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GoldenTwentiesDetailComponent]
    });
    fixture = TestBed.createComponent(GoldenTwentiesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
