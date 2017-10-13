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

        /** 
         * This way, the modules that import the 'SharedModule' 
         * do not need to import FormsModule and HttpModule again!
         * That is why we should export modules
         */
        // FormsModule, 
        // HttpModule
    ],
    exports: [
        NavbarComponent

        /** 
         * This way, the modules that import the 'SharedModule' 
         * do not need to import FormsModule and HttpModule again!
         * That is why we should export modules
         */
        // FormsModule, 
        // HttpModule
    ],
    declarations: [
        NavbarComponent
    ],
    providers: [ // Services, Guards
        // ATTENTION: this module is NOT designed to use providers, because it will create a child INJECTOR
        // and possibly duplicate all the providers... NOT GOOD... 
        // I you want to use shared providers, use the "CoreModule"
    ],
})
export class SharedModule {

    // use `SharedModule.forRoot()` when importing SharedModule into AppModule.
    // use `SharedModule` when importing SharedModule into a lazy loaded module.

    //
    // An argument for not using forRoot in the SharedModule:
    //     - The `forRoot()` function is designed to return this current module (SharedModule) WITH providers,
    //       but we will NOT be using providers here.
    //

    //
    // So any module can import the SharedModule, to access its declarations.
    //


    // static forRoot() : ModuleWithProviders { 
    //     return {
    //         ngModule: SharedModule,
    //         providers: [FooService]
    //     }
    // }
}
