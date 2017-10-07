import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// ATTENTION: 
//    - this module is intended for declarations only (components, directives and pipes)
//    - The declarations here have access to global providers!     
//    - DO NOT add providers here!
//    - A lazy-loaded module that imports this module makes its own copy of the services <<<===
//    - Use forRoot/forChild convention only for shared modules with providers that are going to be imported into both eager and lazy module modules

import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        NavbarComponent
    ],
    declarations: [
        NavbarComponent
    ]
})
export class SharedModule { }
