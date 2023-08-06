import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { StoreModule } from '@ngrx/store';
import { gridReducer } from './state/grid.reducer';
import { AppState } from './state/grid.models';
import { EffectsModule } from '@ngrx/effects';
import { GridEffects } from './state/grid.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CellComponent } from './components/cell/cell.component';
import { SubgridComponent } from './components/subgrid/subgrid.component';

@NgModule({
  declarations: [AppComponent, CellComponent, SubgridComponent, GridComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot<AppState>({ grid: gridReducer }),
    EffectsModule.forRoot(GridEffects),
    StoreDevtoolsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
