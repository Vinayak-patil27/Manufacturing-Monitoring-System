import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentoperationComponent } from './componentoperation.component';

describe('ComponentoperationComponent', () => {
  let component: ComponentoperationComponent;
  let fixture: ComponentFixture<ComponentoperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentoperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentoperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
