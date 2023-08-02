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
  indices = Array(81).map((_, idx) => idx);
  gridSize = `${
    this._drawingService.CONFIG.cellSize * 9 +
    this._drawingService.CONFIG.padding * 8
  }px`;
  padding = `${this._drawingService.CONFIG.padding}px`;

  constructor(private readonly _drawingService: DrawingService) {
    console.log(this.gridSize);
  }
}
