import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SolicitarProductosComponent} from './solicitar-productos.component';

describe('SolicitarProductosComponent', () => {
  let component: SolicitarProductosComponent;
  let fixture: ComponentFixture<SolicitarProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarProductosComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SolicitarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
