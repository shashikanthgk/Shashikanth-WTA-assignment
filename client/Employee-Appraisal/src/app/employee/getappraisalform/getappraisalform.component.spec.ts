import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetappraisalformComponent } from './getappraisalform.component';

describe('GetappraisalformComponent', () => {
  let component: GetappraisalformComponent;
  let fixture: ComponentFixture<GetappraisalformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetappraisalformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetappraisalformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
