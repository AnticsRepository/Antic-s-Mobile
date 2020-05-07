import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoPipe } from './logo/logo.pipe';

@NgModule({
  declarations: [LogoPipe],
  imports: [
    CommonModule
  ],
  exports: [LogoPipe]
})

export class PipesModule { }
