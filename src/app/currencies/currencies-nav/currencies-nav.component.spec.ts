import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesNavComponent } from './currencies-nav.component';

describe('CurrenciesNavComponent', () => {
  let component: CurrenciesNavComponent;
  let fixture: ComponentFixture<CurrenciesNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrenciesNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenciesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
