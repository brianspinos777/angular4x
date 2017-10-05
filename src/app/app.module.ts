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
import { PageNotFoundComponent }            from './pages/page-not-found/page-not-found.component';

// Items CRUD
import { IndexItemComponent }               from './pages/items/index-item/index-item.component';
import { ShowItemComponent }                from './pages/items/show-item/show-item.component';
import { NewItemComponent }                 from './pages/items/new-item/new-item.component';
import { EditItemComponent }                from './pages/items/edit-item/edit-item.component';

import { AppComponent }                     from './app.component';



//========================================================= sub-modules

import { LionsModule }                      from './modules/lions/lions.module';
import { TigersModule }                     from './modules/tigers/tigers.module';
import { ZebrasModule }                     from './modules/zebras/zebras.module';
import { DogsModule }                       from './modules/dogs/dogs.module';
import { WidgetsModule }                    from './modules/widgets/widgets.module';

//========================================================= REDUX
import { NgRedux, NgReduxModule } from 'ng2-redux';
import thunkMiddleware from 'redux-thunk'; // for dispatching functions! (dispatch)=>{...}
// import thunk from 'redux-thunk';
// import promiseMiddleware from 'redux-promise-middleware';

// Logger with default options
import logger from 'redux-logger'; // npm i redux-logger


import { INITIAL_STATE, IAppState } from './redux/app.state';
import { rootReducer } from './redux/reducers/rootReducer';
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
        NgReduxModule,  //========================================================= REDUX

        LionsModule, // Not lazy-loaded
        TigersModule, // Not lazy-loaded
        // ZebrasModule, // lazy-loaded
        // DogsModule, // lazy-loaded
        // WidgetsModule // lazy-loaded
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

        const middlewares = [
            logger,
            thunkMiddleware
        ];

        const enhancers = [];

        ngRedux.configureStore(
            rootReducer,
            INITIAL_STATE,
            middlewares,
            enhancers
        );
    }
    //=========================================================
}
