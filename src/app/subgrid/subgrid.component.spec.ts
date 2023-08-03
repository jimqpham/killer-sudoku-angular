import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgridComponent } from './subgrid.component';

describe('SubgridComponent', () => {
  let component: SubgridComponent;
  let fixture: ComponentFixture<SubgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubgridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
