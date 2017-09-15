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
    groups: object[];
    todos: object[];
};

// Initial whole app state
// these values are what the app will see initially!
const INITIAL_STATE: IAppState = {
    counter: 67,
    users: [{name: 'brian'}],
    groups: [],
    todos: [],
};

//
// reducers
//


// The `state` variable here is a key in the APP STATE.
// the `state` variable here does not matter, but it needs to be there?
function todosReducer(state = [], action){
  switch (action.type){
    case 'ADD_TODO':
      return state.concat([action.payload])
    default:
      return state
  }
}

// The `state` variable here is a key in the APP STATE.
// the `state` variable here does not matter, but it needs to be there?
function usersReducer(state = [], action){
  switch (action.type){
    case 'ADD_USER':
      return state.concat([action.payload])
    default:
      return state
  }
}

// The `state` variable here is a key in the APP STATE.
// the `state` variable here does not matter, but it needs to be there?
function groupsReducer(state = [], action){
  switch (action.type){
    case 'ADD_GROUP':
      return state.concat([action.payload])
    default:
      return state
  }
}

// The `state` variable here is a key in the APP STATE.
// the `state` variable here does not matter, but it needs to be there?
function counterReducer(state = 45, action){
  switch (action.type){
    case 'INCREMENT':
        return state + 1
    case 'DECREMENT':
        return state - 1
    case 'INCREMENT_5':
        return state + 5
    default:
      return state
  }
}

let rootReducer = combineReducers<IAppState>({  
    // keys and values for the whole app state
    todos: todosReducer,
    users: usersReducer,
    groups: groupsReducer,
    counter: counterReducer
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
  constructor(ngRedux: NgRedux<IAppState>){
    let middlewares = [logger];
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