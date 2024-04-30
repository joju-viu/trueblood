import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SangreComponent } from './sangre.component';

describe('SangreComponent', () => {
  let component: SangreComponent;
  let fixture: ComponentFixture<SangreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SangreComponent]
    });
    fixture = TestBed.createComponent(SangreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
