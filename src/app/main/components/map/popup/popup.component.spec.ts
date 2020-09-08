import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';
import { ServiceService } from 'src/app/main/service.service';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  let service: ServiceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupComponent],
      providers: [ServiceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ServiceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should close popup', () => {
    component.closePopup();
    fixture.detectChanges();
    expect(component.popupIsOpen).toBeFalse();
  });
});
