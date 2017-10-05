import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LionsRoutingModule } from './lions-routing.module';
import { TestComponent } from './components/test/test.component';

import { TestService } from './services/test.service';

@NgModule({
  imports: [
    CommonModule,
    LionsRoutingModule
  ],
  declarations: [TestComponent],
  exports: [TestComponent],
  providers: [TestService]
})
export class LionsModule { }
