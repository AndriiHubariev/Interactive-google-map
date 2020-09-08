import { Component, OnInit, Input } from '@angular/core';
import { Property } from 'src/app/model/property.model';
import { ServiceService } from 'src/app/main/service.service';
import { showPopup } from 'src/app/app.animations';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  animations: [showPopup]
})
export class PopupComponent implements OnInit {
  @Input() selectedMarker: Property;
  public popupIsOpen: boolean;

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.popupIsOpen.subscribe(res => this.popupIsOpen = res);
  }
  closePopup(): void {
    this.service.popupIsOpen.next(false);
  }
}
