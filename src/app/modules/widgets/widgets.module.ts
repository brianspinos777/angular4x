import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { TestComponent } from './components/test/test.component';

import { TestService } from './services/test.service';

// sub-modules
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    SharedModule
  ],
  declarations: [TestComponent],
  // exports: [TestComponent],
  providers: [TestService]
})
export class WidgetsModule { }
