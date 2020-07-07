import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoPipe } from './logo/logo.pipe';
import { SanitizerPipe } from './sanitizer/sanitizer.pipe';

@NgModule({
  declarations: [
    LogoPipe,
    SanitizerPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogoPipe,
    SanitizerPipe
  ]
})

export class PipesModule { }
