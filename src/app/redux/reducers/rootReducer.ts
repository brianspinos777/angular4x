import { combineReducers } from 'redux';
import { INITIAL_STATE, IAppState } from '../app.state'


// The `state` variable here is a key in the APP STATE.
// the `state` variable here does not matter, but it needs to be there?
function todosReducer(state = INITIAL_STATE.todos, action){
    switch (action.type){
        case 'ADD_TODO':
            return state.concat([action.payload])
        default:
            return state
    }
}

// The `state` variable here is a key in the APP STATE.
// the `state` variable here does not matter, but it needs to be there?
function usersReducer(state = INITIAL_STATE.users, action){
    switch (action.type){
        case 'ADD_USER':
            return state.concat([action.payload])
        default:
            return state
    }
}

// The `state` variable here is a key in the APP STATE.
// the `state` variable here does not matter, but it needs to be there?
function groupsReducer(state = INITIAL_STATE.groups, action){
    switch (action.type){
        case 'ADD_GROUP':
            return state.concat([action.payload])
        default:
            return state
    }
}

// The `state` variable here is a key in the APP STATE.
// the `state` variable here does not matter, but it needs to be there?
function counterReducer(state = INITIAL_STATE.counter, action){
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


// The `state` variable here is a key in the APP STATE.
// the `state` variable here does not matter, but it needs to be there?
function myHttpReducer(state = INITIAL_STATE.httpResults, action){
    switch (action.type){
        case 'GET_FOO':
            // return state.concat(['111'])
            return state.concat(action.payload)
        case 'FOO_PENDING':
            return state.concat(action.payload)
        case 'FOO_FULFILLED':
            return state.concat(action.payload)
        case 'FOO_REJECTED':
            return state.concat(action.payload)
        default:
            return state
    }
}

export const rootReducer = combineReducers<IAppState>({  
    // keys and values for the whole app state
    todos: todosReducer,
    users: usersReducer,
    groups: groupsReducer,
    counter: counterReducer,
    httpResults: myHttpReducer
})