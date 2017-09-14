import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { Routes, RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { GroupsComponent } from './components/groups/groups.component';

import { AuthGuard } from './guards/auth.guard';

//========================================================= REDUX
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { combineReducers } from 'redux';


// Logger with default options 
import logger from 'redux-logger' // npm i redux-logger


interface IAppState {
    counter: number;
    users: object[];
};
const INITIAL_STATE: IAppState = {
    counter: 0,
    users: []
};

// reducer
function firstReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case 'FOO': 
            return {
                ...INITIAL_STATE, 
                counter: state.counter + action.payload 
            }
        case 'BAR': 
            return {
                ...INITIAL_STATE, 
                counter: state.counter + action.payload 
            }
        default:
            return state;
    }
};

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

let rootReducer = <any>combineReducers({
    todos,
    counter,
    firstReducer
})
//=========================================================

const appRoutes:Routes = [
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
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgReduxModule  //========================================================= REDUX
  ],
  providers: [
      AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  //========================================================= REDUX
  constructor(ngRedux: NgRedux<IAppState>) {
    let middlewares = [logger];
    let enhancers = [];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, middlewares, enhancers); 
  }
  //=========================================================
}