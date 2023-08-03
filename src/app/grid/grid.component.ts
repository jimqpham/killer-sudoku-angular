import { Component } from '@angular/core';
import { DrawingService } from '../drawing.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  subgridSize = `${
    this._drawingService.CONFIG.containerSize * 3 +
    this._drawingService.CONFIG.padding * 2
  }px`;
  subgridIdx = Array(9).map((_, idx) => idx);

  constructor(private readonly _drawingService: DrawingService) {}
}
