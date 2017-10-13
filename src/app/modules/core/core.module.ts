import { NgModule, ModuleWithProviders } from '@angular/core';
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
        // use the `forRoot` function to add providers!
    ],
})
export class CoreModule {
    // use `CoreModule.forRoot()` when importing CoreModule into AppModule.
    // use `CoreModule` when importing CoreModule into a lazy loaded module.

    //
    // An argument for not using forRoot in the CoreModule:
    //     - If I only use the CoreModule for provicers, they will be added to the root Injector,
    //       and be available to all modules, the only usage for the `forRoot()` function would 
    //       be if I would also like to add components to the CoreModule, and make them available 
    //       to the AppModule and to other modules.
    //

    //
    // So only the AppModule should import the CoreModule, to add its providers to the root Injector.
    //


    static forRoot() : ModuleWithProviders { 
        return {
            ngModule: CoreModule,
            // providers: [FooService]
        }
    }
}
