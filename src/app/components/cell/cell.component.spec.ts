import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CellComponent } from './cell.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CellComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
