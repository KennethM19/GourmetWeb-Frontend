import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaMesaPageComponent } from './reserva-mesa-page.component';

describe('ReservaMesaPageComponent', () => {
  let component: ReservaMesaPageComponent;
  let fixture: ComponentFixture<ReservaMesaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaMesaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaMesaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
