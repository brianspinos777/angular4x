import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormExampleComponent } from './my-form-example.component';

describe('MyFormExampleComponent', () => {
  let component: MyFormExampleComponent;
  let fixture: ComponentFixture<MyFormExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFormExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFormExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
