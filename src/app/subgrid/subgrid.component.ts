import { Component } from '@angular/core';
import { DrawingService } from '../drawing.service';

@Component({
  selector: 'app-subgrid',
  templateUrl: './subgrid.component.html',
  styleUrls: ['./subgrid.component.scss'],
})
export class SubgridComponent {
  indices = Array(9).map((_, idx) => idx);
  containerSize = this._drawingService.CONFIG.containerSize;

  constructor(private readonly _drawingService: DrawingService) {}
}
