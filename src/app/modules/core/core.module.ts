import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ATTENTION: this module is intended for providers only (services, guards?)
//            DO NOT add declarations here!

@NgModule({
    imports: [
      CommonModule
    ],
    declarations: [ // Components, Pipes, Directives
        // ATTENTION: this module is NOT designed to use declarations (Components, Pipes, Directives),
        // I you want to use shared declarations, use the "SharedModule"
    ],
    providers: [ // Services, Guards
        //...
    ],
})
export class CoreModule { }
