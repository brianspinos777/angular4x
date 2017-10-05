import { AppComponent } from '../app.component';
import { Routes } from '@angular/router';

// Components
import { GroupsComponent } from '../components/groups/groups.component';
import { MyFormExampleComponent } from '../components/my-form-example/my-form-example.component';

// Items CRUD
import { IndexItemComponent } from '../pages/items/index-item/index-item.component';
import { ShowItemComponent } from '../pages/items/show-item/show-item.component';
import { NewItemComponent } from '../pages/items/new-item/new-item.component';
import { EditItemComponent } from '../pages/items/edit-item/edit-item.component';

// Pages
import { FeaturesComponent } from '../pages/features/features.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { LoginComponent } from '../pages/login/login.component';
import { HomeComponent } from '../pages/home/home.component';

// Guards
import { AuthGuard } from '../guards/auth/auth.guard';


export const appRoutes: Routes = [
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
        path: 'groups',
        canActivate: [AuthGuard],
        component: GroupsComponent
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
        canActivate: [AuthGuard],
        component: IndexItemComponent
    },
    {
        // 'items/new' should go on top of 'items/:id',
        // because it is more specific
        path: 'items/new',
        canActivate: [AuthGuard],
        component: NewItemComponent
    },
    {
        path: 'items/:id',
        canActivate: [AuthGuard],
        component: ShowItemComponent
    },

    {
        path: 'items/:id/edit',
        canActivate: [AuthGuard],
        component: EditItemComponent
    },

    //
    // Sub Modules
    //

    {
        // http://localhost:4200/lazy/something - lazy loading another module
        path: 'lazy',
        canActivate: [AuthGuard],
        loadChildren: '../modules/my-module/my-module.module#MyModuleModule'
    },
    {
        path: 'lions',
        // canActivate: [AuthGuard],
        loadChildren: '../modules/lions/lions.module#LionsModule'
    },
    {
        path: 'zebras',
        // canActivate: [AuthGuard],
        loadChildren: '../modules/zebras/zebras.module#ZebrasModule'
    },
    {
        path: 'tigers',
        // canActivate: [AuthGuard],
        loadChildren: '../modules/tigers/tigers.module#TigersModule'
    },
    {
        path: 'dogs',
        // canActivate: [AuthGuard],
        loadChildren: '../modules/dogs/dogs.module#DogsModule'
    },
    {
        path: 'widgets',
        // canActivate: [AuthGuard],
        loadChildren: '../modules/widgets/widgets.module#WidgetsModule'
    },


    {
        path: '**', // the 'catch al' route!
        canActivate: [AuthGuard],
        component: PageNotFoundComponent
    },
];
