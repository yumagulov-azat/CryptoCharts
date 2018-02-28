import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinChartComponent } from './coin-chart.component';

describe('CoinChartComponent', () => {
  let component: CoinChartComponent;
  let fixture: ComponentFixture<CoinChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
