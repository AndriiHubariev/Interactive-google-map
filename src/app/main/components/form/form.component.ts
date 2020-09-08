import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { appearance, menuBtn } from 'src/app/app.animations';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Property } from 'src/app/model/property.model';
import { PropertiesRepository } from 'src/app/model/properties.repository';


interface Position {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [appearance, menuBtn]
})
export class FormComponent implements OnInit{
  public formIsValid = true;
  public menuIsActive = false;
  public form: FormGroup;
  public selectedImages: Array<string> = [];
  public errImagesMessage = '';
  public errFormMessage = 'please fill all of the fields';
  public formattedaddress = '';
  public selectedPosition: Position = {
    lat: null,
    lng: null
  };
  public options = {
    componentRestrictions: {
      country: ['UA', 'USA']
    }
  };
  constructor(private service: ServiceService, private repository: PropertiesRepository) { }

  ngOnInit(): void {
   this.service.menuIsActive.subscribe(res => this.menuIsActive = res);
   this.form = new FormGroup({
     rooms: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
     area: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
     details: new FormArray([]),
     pictures: new FormControl(''),
     address: new FormControl('', [Validators.required])
   });
  }
  getSelectedPosition(address: any): void {
    const position = {
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng()
    };
    this.selectedPosition = position;
    this.formattedaddress = address.formatted_address;
  }
  closeMenu() {
    this.service.menuIsActive.next(false);
  }
  addDetail(): void {
    const newDetail = new FormControl('', [Validators.required]);
    (this.form.get('details') as FormArray).push(newDetail);
  }
  deleteDetail(idx): void {
    (this.form.get('details') as FormArray).removeAt(idx);
  }
  saveImages(e: { target: any; }): void {
      this.selectedImages = [];
      this.errImagesMessage = '';
      const files: [] = e.target.files;
      if (files.length > 10) {
        this.errImagesMessage = 'only 10 items is allowed';
        return this.form.controls.pictures.setErrors({maxLength: 10});
      }
      this.form.controls.pictures.setErrors(null);
      for (const i of files ) {
        const rider = new FileReader();
        rider.readAsDataURL(i);
        rider.onload = (event: any) => {
          this.selectedImages.push(event.target.result);
        };
      }
  }
  submit() {
    if (this.form.valid) {
      this.formIsValid = true;
      const property: Property = new Property(
        this.form.value.rooms,
        this.form.value.area,
        this.form.value.details,
        this.selectedImages,
        this.formattedaddress,
        this.selectedPosition
        );
      this.repository.addProperty(property);
      this.service.menuIsActive.next(false);
      this.selectedImages = [];
      this.formattedaddress = '';
      (this.form.get('details') as FormArray).clear();
      this.form.reset();
    } else {
      this.formIsValid = false;
    }
  }
}
