import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CellComponent } from './cell.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  selectActiveAreaId,
  selectAreaIdForCellIdx,
  selectSelectedCellIdx,
} from 'src/app/state/grid.selectors';
import { By } from '@angular/platform-browser';
import {
  setActiveArea,
  setEnteredValue,
  toggleSelectedCellIdx,
  unsetActiveArea,
} from 'src/app/state/grid.actions';

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;
  let store: MockStore;
  const CELL_IDX = 0;
  const AREA_ID = 'AREA_ID';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CellComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectSelectedCellIdx,
              value: CELL_IDX,
            },
            {
              selector: selectAreaIdForCellIdx[CELL_IDX],
              value: AREA_ID,
            },
            {
              selector: selectActiveAreaId,
              value: AREA_ID,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CellComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.cellIdx = CELL_IDX;
    fixture.detectChanges();
  });

  afterEach(() => {
    store.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the cell as selected', () => {
    const selectedCell = fixture.debugElement.query(
      By.css('.cell-container__selected')
    );

    expect(selectedCell).toBeTruthy();
  });

  it('should toggle the selected status on click', () => {
    const selectedCell = fixture.debugElement.query(
      By.css('.cell-container__selected')
    );
    spyOn(store, 'dispatch');

    selectedCell.triggerEventHandler('click');

    expect(store.dispatch).toHaveBeenCalledOnceWith(
      toggleSelectedCellIdx({ payload: CELL_IDX })
    );
  });

  it('should dispatch setActiveArea action when the user hovers the mouse over the cell', () => {
    // Act
    spyOn(store, 'dispatch');
    fixture.debugElement
      .query(By.css('.cell-container'))
      .triggerEventHandler('mouseenter');

    // Assert
    expect(store.dispatch).toHaveBeenCalledOnceWith(
      setActiveArea({ payload: AREA_ID })
    );
  });

  it('should dispatch unsetActive action when the cursor exits the cell', () => {
    // Act
    spyOn(store, 'dispatch');
    fixture.debugElement
      .query(By.css('.cell-container'))
      .triggerEventHandler('mouseleave');

    // Assert
    expect(store.dispatch).toHaveBeenCalledOnceWith(unsetActiveArea());
  });

  it('should mark as active area when the area ID matches the active area ID from store', () => {
    const selectedCell = fixture.debugElement.query(
      By.css('.cell-container__active')
    );

    expect(selectedCell).toBeTruthy();
  });

  it('should not mark as active area when the area ID does not match the active area ID from store', () => {
    store.overrideSelector(selectActiveAreaId, 'RANDOM');
    store.refreshState();
    fixture.detectChanges();

    const selectedCell = fixture.debugElement.query(
      By.css('.cell-container__active')
    );

    expect(selectedCell).toBeFalsy();
  });

  it('should register entered value if the user enters a digit', () => {
    spyOn(store, 'dispatch');
    const selectedCell = fixture.debugElement.query(
      By.css('.cell-container__active')
    );

    selectedCell.triggerEventHandler(
      'keypress',
      new KeyboardEvent('keypress', { key: '8' })
    );

    expect(store.dispatch).toHaveBeenCalledOnceWith(
      setEnteredValue({ payload: 8 })
    );
  });

  it('should NOT register entered value if the user enters a non-digit', () => {
    spyOn(store, 'dispatch');
    const selectedCell = fixture.debugElement.query(
      By.css('.cell-container__active')
    );

    selectedCell.triggerEventHandler(
      'keypress',
      new KeyboardEvent('keypress', { key: 'a' })
    );

    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
