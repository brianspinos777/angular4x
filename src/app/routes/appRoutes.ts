import { Routes }   from '@angular/router';

import { AppComponent } from '../app.component';
// import { LoginComponent } from '../components/login/login.component';
import { LoginComponent } from '../pages/login/login.component';
// import { HomeComponent } from '../components/home/home.component';
import { HomeComponent } from '../pages/home/home.component';
import { UsersComponent } from '../components/users/users.component';
import { GroupsComponent } from '../components/groups/groups.component';
import { MyFormExampleComponent } from '../components/my-form-example/my-form-example.component';

// Items CRUD
import { IndexItemComponent } from '../pages/items/index-item/index-item.component';
import { ShowItemComponent } from '../pages/items/show-item/show-item.component';
import { NewItemComponent } from '../pages/items/new-item/new-item.component';
import { EditItemComponent } from '../pages/items/edit-item/edit-item.component'

import { AuthGuard } from '../guards/auth.guard';


export const appRoutes:Routes = [
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
        path: 'users/:id',
        canActivate: [AuthGuard],
        component: UsersComponent
    },
    {
        path: 'users',
        canActivate: [AuthGuard],
        component: UsersComponent
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

    // Items CRUD
    
    {
        path: 'items',
        canActivate: [AuthGuard],
        component: IndexItemComponent
    },
    {
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

    // {
    //     path: '**', // the 'catch al' route!
    //     canActivate: [AuthGuard],
    //     component: MyPageNotFoundComponent
    // },
]