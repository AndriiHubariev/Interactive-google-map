import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public menuIsActive = new BehaviorSubject(false);
  public popupIsOpen = new BehaviorSubject(false);
  constructor() { }
}
