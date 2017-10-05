import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZebrasRoutingModule } from './zebras-routing.module';
import { TestComponent } from './components/test/test.component';

@NgModule({
  imports: [
    CommonModule,
    ZebrasRoutingModule
  ],
  declarations: [TestComponent]
})
export class ZebrasModule { }
