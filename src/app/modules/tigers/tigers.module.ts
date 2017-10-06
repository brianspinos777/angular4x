import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TigersRoutingModule } from './tigers-routing.module';
import { TestComponent } from './components/test/test.component';

import { TestService } from './services/test.service';

@NgModule({
  imports: [
    CommonModule,
    TigersRoutingModule
  ],
  declarations: [TestComponent],
  // exports: [TestComponent],
  providers: [TestService]
})
export class TigersModule { }
