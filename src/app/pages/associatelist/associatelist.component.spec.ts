import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatelistComponent } from './associatelist.component';

describe('AssociatelistComponent', () => {
  let component: AssociatelistComponent;
  let fixture: ComponentFixture<AssociatelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssociatelistComponent]
    });
    fixture = TestBed.createComponent(AssociatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
