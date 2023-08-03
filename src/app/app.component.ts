import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { DrawingService } from './drawing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  subgridSize = `${
    this._drawingService.CONFIG.containerSize * 3 +
    this._drawingService.CONFIG.padding * 2
  }px`;
  subgridIdx = Array(9).map((_, idx) => idx);

  constructor(private readonly _drawingService: DrawingService) {}
}
