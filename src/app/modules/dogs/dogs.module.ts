import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DogsRoutingModule } from './dogs-routing.module';
import { TestComponent } from './components/test/test.component';

import { TestService } from './services/test.service';

@NgModule({
  imports: [
    CommonModule,
    DogsRoutingModule,
  ],
  declarations: [TestComponent],
  // exports: [TestComponent],
  providers: [TestService]
})
export class DogsModule { }
