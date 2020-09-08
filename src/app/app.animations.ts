import {
  trigger,
  transition,
  useAnimation,
} from '@angular/animations';
import { slideInLeft, zoomOut, zoomIn } from 'ng-animate';

export const appearance = trigger('appearance', [
  transition('void => *', useAnimation(slideInLeft, {params: {timing: .5}})),
  transition('* => void', useAnimation(zoomOut, {params: {timing: .5}})),
]);
export const menuBtn = trigger('menuBtn', [
  transition('void => *', useAnimation(zoomIn, {params: {timing: .5}})),
]);
export const showPopup = trigger('showPopup', [
  transition('void => *', useAnimation(zoomIn, {params: {timing: .5}})),
]);

