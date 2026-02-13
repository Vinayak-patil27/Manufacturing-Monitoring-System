import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoactionmasterComponent } from './loactionmaster.component';

describe('LoactionmasterComponent', () => {
  let component: LoactionmasterComponent;
  let fixture: ComponentFixture<LoactionmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoactionmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoactionmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
