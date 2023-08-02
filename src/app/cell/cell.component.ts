import { Component, ElementRef } from '@angular/core';
import { DrawingService } from '../drawing.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent {
  cellSize = this._drawingService.CONFIG.cellSize;
  containerSize = this._drawingService.CONFIG.containerSize;
  roundedBorder = this._drawingService.CONFIG.roundedBorder;

  constructor(
    private readonly _drawingService: DrawingService,
    private readonly _elementRef: ElementRef
  ) {}
}
