import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZebrasRoutingModule } from './zebras-routing.module';
import { TestComponent } from './components/test/test.component';

import { TestService } from './services/test.service';

@NgModule({
  imports: [
    CommonModule,
    ZebrasRoutingModule
  ],
  declarations: [TestComponent],
  // exports: [TestComponent],
  providers: [TestService]
})
export class ZebrasModule { }
