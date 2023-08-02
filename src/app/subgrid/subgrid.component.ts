import { Component } from '@angular/core';
import { DrawingService } from '../drawing.service';

@Component({
  selector: 'app-subgrid',
  templateUrl: './subgrid.component.html',
  styleUrls: ['./subgrid.component.scss']
})
export class SubgridComponent {
  indices = Array(9).map((_, idx) => idx);
  gridSize = `${
    this._drawingService.CONFIG.cellSize * 3 +
    this._drawingService.CONFIG.padding * 2
  }px`;
  padding = `${this._drawingService.CONFIG.padding}px`;

  constructor(private readonly _drawingService: DrawingService) {
    console.log(this.gridSize);
  }
}
