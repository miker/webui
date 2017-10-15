import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleCardsComponent } from './example-cards.component';

describe('ExampleCardsComponent', () => {
  let component: ExampleCardsComponent;
  let fixture: ComponentFixture<ExampleCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
