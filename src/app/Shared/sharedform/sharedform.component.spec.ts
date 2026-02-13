import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedformComponent } from './sharedform.component';

describe('SharedformComponent', () => {
  let component: SharedformComponent;
  let fixture: ComponentFixture<SharedformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
