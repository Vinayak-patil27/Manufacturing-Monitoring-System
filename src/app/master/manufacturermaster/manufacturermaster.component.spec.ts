import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturermasterComponent } from './manufacturermaster.component';

describe('ManufacturermasterComponent', () => {
  let component: ManufacturermasterComponent;
  let fixture: ComponentFixture<ManufacturermasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturermasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
