import { BrowserModule }                    from '@angular/platform-browser';
import { NgModule }                         from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }                       from '@angular/http';
import { Routes, RouterModule }             from '@angular/router';

// Services
import { AuthService }                      from './services/auth/auth.service';
import { ItemService }                      from './services/items/item.service';

// Pipes
import { MySummaryPipe }                    from './pipes/my-summary/my-summary.pipe';

// Directives
import { MyInputFormatterDirective }        from './directives/my-input-formatter/my-input-formatter.directive';

// Guards
import { AuthGuard }                        from './guards/auth/auth.guard';

// Components
import { MyChildComponent }                 from './components/my-child/my-child.component';
import { MyFormExampleComponent }           from './components/my-form-example/my-form-example.component';
import { NavbarComponent }                  from './components/navbar/navbar.component';
import { GroupsComponent }                  from './components/groups/groups.component';

// Pages
import { LoginComponent }                   from './pages/login/login.component';
import { HomeComponent }                    from './pages/home/home.component';
import { FeaturesComponent }                from './pages/features/features.component';
import { PageNotFoundComponent }            from './pages/page-not-found/page-not-found.component'

// Items CRUD
import { IndexItemComponent }               from './pages/items/index-item/index-item.component';
import { ShowItemComponent }                from './pages/items/show-item/show-item.component';
import { NewItemComponent }                 from './pages/items/new-item/new-item.component';
import { EditItemComponent }                from './pages/items/edit-item/edit-item.component'

import { AppComponent }                     from './app.component';

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




@NgModule({
    declarations: [ // Components, Pipes, Directives
        AppComponent,
        LoginComponent,
        HomeComponent,
        GroupsComponent,
        IndexItemComponent,
        ShowItemComponent,
        NewItemComponent,
        EditItemComponent,
        MyChildComponent,
        MyFormExampleComponent,
        NavbarComponent,
        MyInputFormatterDirective,
        MySummaryPipe,
        FeaturesComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        NgReduxModule  //========================================================= REDUX
    ],
    providers: [ // Services, Guards
        AuthGuard,
        AuthService,
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