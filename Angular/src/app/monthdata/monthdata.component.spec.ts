import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthdataComponent } from './monthdata.component';

describe('MonthdataComponent', () => {
  let component: MonthdataComponent;
  let fixture: ComponentFixture<MonthdataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthdataComponent]
    });
    fixture = TestBed.createComponent(MonthdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
