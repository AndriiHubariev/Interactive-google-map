import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { PropertiesRepository } from 'src/app/model/properties.repository';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceService } from '../../service.service';
import { Property } from 'src/app/model/property.model';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let service: ServiceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [ MapComponent ],
      providers: [ServiceService, PropertiesRepository]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ServiceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should open menu', () => {
    component.openMenu();
    expect(service.popupIsOpen).toBeTruthy();
  });
  it('should get clicked marker', () => {
    const marker: Property = {};
    component.markerIsClicked(marker);
    expect(component.clickedMarker).toEqual(marker);
  });
});
