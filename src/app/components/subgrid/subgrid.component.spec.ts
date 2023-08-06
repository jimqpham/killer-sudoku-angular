import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgridComponent } from './subgrid.component';
import { CellComponent } from '../cell/cell.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('SubgridComponent', () => {
  let component: SubgridComponent;
  let fixture: ComponentFixture<SubgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubgridComponent, CellComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(SubgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getAbsoluteCellIdx fn', () => {
    it('should return the correct absolute cell idx', () => {
      const cell1 = {
        expectedAbsoluteCellIdx: 0,
        subgridIdx: 0,
        relativeCellIdx: 0,
      }; // top left cell
      const cell2 = {
        expectedAbsoluteCellIdx: 80,
        subgridIdx: 8,
        relativeCellIdx: 8,
      }; // bottom right cell
      const cell3 = {
        expectedAbsoluteCellIdx: 72,
        subgridIdx: 6,
        relativeCellIdx: 6,
      }; // bottom left cell
      const cell4 = {
        expectedAbsoluteCellIdx: 8,
        subgridIdx: 2,
        relativeCellIdx: 2,
      }; // top right cell
      const cell5 = {
        expectedAbsoluteCellIdx: 40,
        subgridIdx: 4,
        relativeCellIdx: 4,
      }; // center cell

      [cell1, cell2, cell3, cell4, cell5].forEach((cell) =>
        expect(
          component.getAbsoluteCellIdx(cell.subgridIdx, cell.relativeCellIdx)
        ).toEqual(cell.expectedAbsoluteCellIdx)
      );
    });
  });
});
