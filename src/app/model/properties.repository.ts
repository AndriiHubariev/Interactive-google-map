import { Injectable } from '@angular/core';
import { Property } from './property.model';
import { of, Observable } from 'rxjs';

@Injectable()
export class PropertiesRepository {
  private properties: Property[] = [];

  getProperties(): Observable<Property[]> {
    return of<Property[]>(this.properties);
  }
  addProperty(property: Property) {
    this.properties.push(property);
  }
}
