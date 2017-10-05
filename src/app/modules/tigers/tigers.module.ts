import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TigersRoutingModule } from './tigers-routing.module';
import { TestComponent } from './components/test/test.component';

@NgModule({
  imports: [
    CommonModule,
    TigersRoutingModule
  ],
  declarations: [TestComponent]
})
export class TigersModule { }
