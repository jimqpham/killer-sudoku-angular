import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CellComponent } from './cell/cell.component';
import { SubgridComponent } from './subgrid/subgrid.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
  declarations: [AppComponent, CellComponent, SubgridComponent, GridComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
