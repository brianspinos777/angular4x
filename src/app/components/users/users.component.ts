import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment'; // for ENV
import { Observable } from 'rxjs/Observable';
import { INITIAL_STATE, IAppState } from '../../redux/app.state'
import { NgRedux, select } from 'ng2-redux';  //========================= REDUX


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    // keys of the state object!
    @select() counter: Observable<number>; //========================= REDUX
    @select() users: Observable<Array<object>>; //========================= REDUX
    @select() httpResults: Observable<Array<string>>; //========================= REDUX

    
    myVarA:any = ""
    myVarB:any = ""
    myVarC:any = ""
    myVarD:any = ""
    myVarE:any = ""
    myVarF:any = ""
    myVarG:any = ""
    myVarH:any = ""
    myVarI:boolean = false

    toBeSentToChild:string = " P"
    toBeSetByChild:string = " C"

    foobar:Array<number> = [1,2,3];
    foobar2:number[] = [1,2,3];
    initialData = {
        test: false,
        myObj: {
            hash: "",
            pass: "",
            success:false
        }
    };
    // string, number, boolean, any, object

    apiUrl = environment.apiUrl;
    

    constructor(
        private activatedRoute: ActivatedRoute, 
        private http: Http,
        private ngRedux: NgRedux<IAppState> //======================================== REDUX
    ){
        //...
        console.log('Hello from constructor')
    }

    ngOnInit() {
        console.log("ngOnInit() called");

        // make http calls here to get data for component initialization,
        // and set class fields from the result of the http call.
        this.http.get(this.apiUrl + "checkpass")
            .map(res => res.json())
            .subscribe(res => {
                console.log(res)
                this.initialData = res
            })
    }

    getParams(){
        let id = this.activatedRoute.snapshot.params.id
        this.myVarA = id
    }

    makeHttpGetCall(){
        this.http.get(this.apiUrl + "foo")
        .map(res => res.json())
        .subscribe(res => {
            console.log(res)
            this.myVarB = res
        })
    }

    increment_5(){
        //========================================================= REDUX
        this.ngRedux.dispatch({type: 'INCREMENT_5', payload: 5})
        //=========================================================
    }

    getStateFromRedux(){
        let state = this.ngRedux.getState()
        console.log(state)
        this.myVarC = state
    }

    generatepasswordHash(){
        this.http.get(this.apiUrl + "pass") 
        .map(res => res.json())
        .subscribe(res => {
            console.log(res)
            this.myVarD = res
        })
    }

    checkpasswordHash(){
        this.http.get(this.apiUrl + "checkpass")
        .map(res => res.json())
        .subscribe(res => {
            console.log(res)
            this.myVarE = res
        })
    }

    logEnv(){
        console.log(environment); // {production: true} 
        this.myVarF = environment
    }

  getUsersFromState(){
    let {users} = this.ngRedux.getState();

    console.log(users);
    this.myVarG = users
  }

    addUser(){
        this.ngRedux.dispatch({
            type: 'ADD_USER', 
            payload: {name: 'erich'}
        });
    }

    // Using Thunk middleware!
    useReduxWithHttp(){
        this.ngRedux.dispatch<any>((dispatch) => {
            dispatch({type: 'FOO_PENDING', payload: 'p'});

            this.http.get(this.apiUrl + "checkpass")
            .map(res => res.json())
            .subscribe(
                res => {
                    // console.log(res)
                    dispatch({
                        type: 'FOO_FULFILLED',
                        payload: res
                    });
                },
                error =>{
                    // console.log(error)
                    dispatch({
                        type: 'FOO_REJECTED', 
                        payload: 'r'
                    });
                }
            )
        });
    }

    increment_1() {
        this.ngRedux.dispatch({ type: 'INCREMENT' });
    }

    changeMyVarI(){
        this.myVarI = !this.myVarI
    }

    changeDataSentToChildComponent(text){
        this.toBeSentToChild += text
    }

    getDataFromChildComponent(data){
        this.toBeSetByChild += data
    }


    //
    // Component Lifecycle hooks
    //

    // constructor()

    ngOnChanges(){
        console.log('Hello from ngOnChanges')
    }

    // ngOnInit()

    ngDoCheck(){
        console.log('Hello from ngDoCheck')
    }

    ngAfterContentInit(){
        console.log('Hello from ngAfterContentInit')
    }

    ngAfterContentChecked(){
        console.log('Hello from ngAfterContentChecked')
    }

    ngAfterViewInit(){
        console.log('Hello from ngAfterViewInit')
    }

    ngAfterViewChecked(){
        console.log('Hello from ngAfterViewChecked')
    }

    ngOnDestroy(){
        console.log('Hello from ngOnDestroy')
        // Use this hook to unsubscribe observables and detach event handlers to avoid memory leaks.
        // e.g.: this.subscription.unsubscribe()
        // the async pipe unsubscribes automatically to avoid potential memory leaks.
        alert('Bye')
    }

}
