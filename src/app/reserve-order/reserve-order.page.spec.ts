import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReserveOrderPage } from './reserve-order.page';

describe('ReserveOrderPage', () => {
  let component: ReserveOrderPage;
  let fixture: ComponentFixture<ReserveOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReserveOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
