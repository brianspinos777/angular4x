import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { MyFormExampleComponent } from 'app/components/my-form-example/my-form-example.component';

// Items CRUD
import { IndexItemComponent } from 'app/pages/items/index-item/index-item.component';
import { ShowItemComponent } from 'app/pages/items/show-item/show-item.component';
import { NewItemComponent } from 'app/pages/items/new-item/new-item.component';
import { EditItemComponent } from 'app/pages/items/edit-item/edit-item.component';

// Pages
import { FeaturesComponent } from 'app/pages/features/features.component';
import { PageNotFoundComponent } from 'app/pages/page-not-found/page-not-found.component';
import { LoginComponent } from 'app/pages/login/login.component';
import { HomeComponent } from 'app/pages/home/home.component';

// Guards
import { AuthGuard } from 'app/guards/auth/auth.guard';

const routes: Routes = [
    // {
    //     path: 'somePathHereWithChildren',
    //     children: [
    //         {
    //             path: '',
    //             component: BazComponent
    //         },
    //         {
    //             path: ':id',
    //             canActivate: [SomeGuardHere?]
    //             component: BazComponent
    //         },
    //         {
    //             path: 'foo',
    //             component: FooComponent
    //         },
    //         {
    //             path: 'bar',
    //             component: BarComponent,
    //             redirectTo: '/otherPath',
    //             pathMatch: 'full'
    //         },
    //     ]
    // },

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        canActivate: [AuthGuard],
        component: HomeComponent
    },
    {
        path: 'myformexample',
        canActivate: [AuthGuard],
        component: MyFormExampleComponent
    },
    {
        path: 'features/:id',
        canActivate: [AuthGuard],
        component: FeaturesComponent
    },
    {
        path: 'features',
        canActivate: [AuthGuard],
        component: FeaturesComponent
    },

    // Items CRUD

    {
        path: 'items',
        children: [
            {
                path: '', // /items
                canActivate: [AuthGuard],
                component: IndexItemComponent
            },
            {
                // 'items/new' should go on top of 'items/:id',
                // because it is more specific
                path: 'new', // /items/new
                canActivate: [AuthGuard],
                component: NewItemComponent
            },
            {
                path: ':id', // /items/:id
                canActivate: [AuthGuard],
                component: ShowItemComponent
            },

            {
                path: ':id/edit', // /items/:id/edit
                canActivate: [AuthGuard],
                component: EditItemComponent
            }
        ]
    },

    //
    // Sub Modules
    // ATTENTION: for lazy modules to work in production, you need to use the absolute path, not a relative path.
    //

    {
        // http://localhost:4200/lazy/something - lazy loading another module
        path: 'lazy',
        canActivate: [AuthGuard],
        loadChildren: 'app/modules/my-module/my-module.module#MyModuleModule' // need absolute path
    },
    {
        path: 'lions',
        // canActivate: [AuthGuard],
        loadChildren: 'app/modules/lions/lions.module#LionsModule' // need absolute path
    },
    {
        path: 'zebras',
        // canActivate: [AuthGuard],
        loadChildren: 'app/modules/zebras/zebras.module#ZebrasModule' // need absolute path
    },
    {
        path: 'tigers',
        // canActivate: [AuthGuard],
        loadChildren: 'app/modules/tigers/tigers.module#TigersModule' // need absolute path
    },
    {
        path: 'dogs',
        // canActivate: [AuthGuard],
        loadChildren: 'app/modules/dogs/dogs.module#DogsModule' // need absolute path
    },
    {
        path: 'widgets',
        // canActivate: [AuthGuard],
        loadChildren: 'app/modules/widgets/widgets.module#WidgetsModule' // need absolute path
    },


    {
        path: '**', // the 'catch al' route!
        canActivate: [AuthGuard],
        component: PageNotFoundComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
