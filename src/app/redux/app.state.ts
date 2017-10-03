export interface IAppState {
    counter: number;
    users: object[];
    groups: object[];
    todos: object[];
    httpResults: string[];
}

// Initial whole app state
// these values are what the app will see initially!
export const INITIAL_STATE: IAppState = {
    counter: 67,
    users: [{name: 'brian'}],
    groups: [],
    todos: [],
    httpResults: ['xxx', 'yyy', 'zzz']
};
