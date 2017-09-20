import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexItemComponent } from './index-item.component';

describe('IndexItemComponent', () => {
  let component: IndexItemComponent;
  let fixture: ComponentFixture<IndexItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
