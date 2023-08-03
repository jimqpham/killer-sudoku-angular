import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  constructor() {}

  CONFIG = {
    cellSize: 70,
    containerSize: 70,
    roundedBorder: 8,
    padding: 5,
  };
}
