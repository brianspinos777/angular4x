import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

// Services
import { ItemService } from './services/items/item.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { GroupsComponent } from './components/groups/groups.component';

// Items CRUD
import { IndexItemComponent } from './pages/items/index-item/index-item.component';
import { ShowItemComponent } from './pages/items/show-item/show-item.component';
import { NewItemComponent } from './pages/items/new-item/new-item.component';
import { EditItemComponent } from './pages/items/edit-item/edit-item.component'

// Guards
import { AuthGuard } from './guards/auth.guard';

//========================================================= REDUX
import { NgRedux, NgReduxModule } from 'ng2-redux';
import thunkMiddleware from 'redux-thunk' // for dispatching functions! (dispatch)=>{...}
// import thunk from 'redux-thunk';
// import promiseMiddleware from 'redux-promise-middleware';

// Logger with default options 
import logger from 'redux-logger' // npm i redux-logger


import { INITIAL_STATE, IAppState } from './redux/app.state'
import { rootReducer } from './redux/reducers/rootReducer'
//=========================================================
import { appRoutes } from './routes/appRoutes';
import { MyChildComponent } from './components/my-child/my-child.component';
import { MyFormExampleComponent } from './components/my-form-example/my-form-example.component'


@NgModule({
    declarations: [ // COmponents, Pipes, Directives
        AppComponent,
        LoginComponent,
        HomeComponent,
        UsersComponent,
        GroupsComponent,
        IndexItemComponent,
        ShowItemComponent,
        NewItemComponent,
        EditItemComponent,
        MyChildComponent,
        MyFormExampleComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        NgReduxModule  //========================================================= REDUX
    ],
    providers: [
        AuthGuard,
        ItemService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    //========================================================= REDUX
    constructor(ngRedux: NgRedux<IAppState>){

        let middlewares = [
            logger, 
            thunkMiddleware
        ];

        let enhancers = [];
        
        ngRedux.configureStore(
            rootReducer, 
            INITIAL_STATE, 
            middlewares, 
            enhancers
        ); 
    }
    //=========================================================
}