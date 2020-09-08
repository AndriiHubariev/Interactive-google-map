// tslint:disable: no-string-literal
import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { PropertiesRepository } from 'src/app/model/properties.repository';
import { ServiceService } from '../../service.service';

describe('FormComponent', () => {
  let component: FormComponent;
  let service: ServiceService;
  let repository: PropertiesRepository;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      providers: [PropertiesRepository]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ServiceService);
    repository = TestBed.inject(PropertiesRepository);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get value about open/close menu', () => {
    service.menuIsActive.next(true);
    expect(component.menuIsActive).toBeTruthy();
  });
  it('should close menu', () => {
    component.closeMenu();
    expect(component.menuIsActive).toBeFalse();
  });
  it('should save images', (): void => {
    const blob = new Blob([''], { type: 'text/html' });
    blob['lastModifiedDate'] = '';
    blob['name'] = 'filename';
    const fakeF = blob;
    const event = {target: {files: [fakeF]}};
    component.saveImages(event);
    fixture.detectChanges();
    setTimeout(() => {
      expect(component.selectedImages.length).toBe(1);
      console.log('expect');
    }, 100);
  });
  it('should return err if uploaded more than 10', () => {
    const blob = new Blob([''], { type: 'text/html' });
    blob['lastModifiedDate'] = '';
    blob['name'] = 'filename';
    const fakeF = blob;
    const event = {target: {files: [fakeF, fakeF, fakeF, fakeF, fakeF, fakeF, fakeF, fakeF, fakeF, fakeF, fakeF]}};
    component.saveImages(event);
    fixture.detectChanges();
    expect(component.errImagesMessage).toContain('only 10 items is allowed');
  });
  it('should create form with 4 controls', () => {
    expect(component.form.contains('rooms')).toBeTruthy();
    expect(component.form.contains('area')).toBeTruthy();
    expect(component.form.contains('details')).toBeTruthy();
    expect(component.form.contains('address')).toBeTruthy();
  });
  it('should get selected position', () => {
    const testAddres = {
      geometry: {
        location: {
          lat: () => 1,
          lng: () => 1
        }
      },
      formatted_address: 'test'
    };
    component.getSelectedPosition(testAddres);
    fixture.detectChanges();
    expect(component.selectedPosition.lat).toEqual(1);
    expect(component.selectedPosition.lng).toEqual(1);
  });
  it('should add detail into details arrey in the form', () => {
    component.addDetail();
    fixture.detectChanges();
    expect(component.form.value.details.length).toEqual(1);
  });
  it('should delete detail from details arrey in the form', () => {
    component.addDetail();
    fixture.detectChanges();
    component.deleteDetail(0);
    expect(component.form.value.details.length).toEqual(0);
  });
  it('should send new property', () => {
    component.form.controls.rooms.setValue(1);
    component.form.controls.area.setValue(1);
    component.form.controls.address.setValue('test');
    component.submit();
    fixture.detectChanges();
    repository.getProperties().subscribe(res => {
      expect(res.length).toEqual(1);
    });
  });
  it('should emmit error if form invalid', () => {
    component.submit();
    expect(component.formIsValid).toBeFalse();
  });
});
