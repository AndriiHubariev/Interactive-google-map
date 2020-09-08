import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ServiceService } from '../../service.service';
import { menuBtn } from 'src/app/app.animations';
import { PropertiesRepository } from 'src/app/model/properties.repository';
import { Property } from 'src/app/model/property.model';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  animations: [menuBtn]
})
export class MapComponent implements OnInit {
  public clickedMarker: Property = {};
  public menuIsActive = false;
  public properties: Property[] = [];
  constructor(public service: ServiceService, private repository: PropertiesRepository) { }

  ngOnInit(): void {
    this.service.menuIsActive.subscribe(res => this.menuIsActive = res);
    this.repository.getProperties().subscribe(res => this.properties = res);
  }
  openMenu(): void {
    this.service.menuIsActive.next(true);
  }
  markerIsClicked(marker: Property): void {
    this.clickedMarker = marker;
    this.service.popupIsOpen.next(true);
  }
}
