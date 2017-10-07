import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DogsRoutingModule } from './dogs-routing.module';
import { TestComponent } from './components/test/test.component';

import { TestService } from './services/test.service';

// sub-modules
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DogsRoutingModule,
    SharedModule
  ],
  declarations: [TestComponent],
  // exports: [TestComponent],
  providers: [TestService]
})
export class DogsModule { }
