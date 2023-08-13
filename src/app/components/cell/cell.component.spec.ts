import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CellComponent } from './cell.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  selectActiveAreaId,
  selectAreaIdForCellIdx,
  selectIsCorrectAnswerForCellIdx,
  selectIsUnansweredForCellIdx,
  selectIsWrongAnswerForCellIdx,
  selectSelectedCellIdx,
} from 'src/app/state/grid.selectors';
import { By } from '@angular/platform-browser';
import {
  setActiveArea,
  setEnteredValue,
  clickCellIdx,
  unsetActiveArea,
  resetEnteredValueWrongAnswer,
  resetSelectedCellIdxCorrectAnswer,
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
            {
              selector: selectIsUnansweredForCellIdx[CELL_IDX],
              value: true,
            },
            {
              selector: selectIsWrongAnswerForCellIdx[CELL_IDX],
              value: false,
            },
            {
              selector: selectIsCorrectAnswerForCellIdx[CELL_IDX],
              value: false,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CellComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.cellIdx = CELL_IDX;
    spyOn(store, 'dispatch');
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
    const selectedCell = fixture.debugElement.query(By.css('.cell-container'));

    selectedCell.triggerEventHandler('click');

    expect(store.dispatch).toHaveBeenCalledOnceWith(
      clickCellIdx({ payload: CELL_IDX })
    );
  });

  it('should dispatch setActiveArea action when the user hovers the mouse over the cell', () => {
    // Act
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
    const selectedCell = fixture.debugElement.query(
      By.css('.cell-container__active')
    );

    selectedCell.triggerEventHandler(
      'keypress',
      new KeyboardEvent('keypress', { key: 'a' })
    );

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should wait and reset the answer if it is incorrect', fakeAsync(() => {
    store.overrideSelector(selectIsWrongAnswerForCellIdx[CELL_IDX], true);
    store.refreshState();
    tick(600);

    expect(store.dispatch).toHaveBeenCalledOnceWith(
      resetEnteredValueWrongAnswer({ payload: CELL_IDX })
    );
  }));

  it('should reset the selected cell index after a correct answer', () => {
    store.overrideSelector(selectIsCorrectAnswerForCellIdx[CELL_IDX], true);
    store.refreshState();

    expect(store.dispatch).toHaveBeenCalledOnceWith(
      resetSelectedCellIdxCorrectAnswer()
    );
  });

  it('should zoom in on hover if the correct value has not been entered', () => {
    // Arrange
    const cellContainer = fixture.debugElement.query(By.css('.cell-container'));
    cellContainer.triggerEventHandler('mouseenter');

    // Act
    fixture.detectChanges();

    // Assert
    const zoomableCell = fixture.debugElement.query(
      By.css('.cell-container__zoom-in')
    );
    expect(zoomableCell).toBeTruthy();
  });

  it('should NOT zoom in on hover if the correct value has been entered', () => {
    // Arrange
    store.overrideSelector(selectIsUnansweredForCellIdx[CELL_IDX], false);
    store.refreshState();
    const cellContainer = fixture.debugElement.query(By.css('.cell-container'));
    cellContainer.triggerEventHandler('mouseenter');

    // Act
    fixture.detectChanges();

    // Assert
    const zoomableCell = fixture.debugElement.query(
      By.css('.cell-container__zoom-in')
    );
    expect(zoomableCell).toBeFalsy();
  });
});
