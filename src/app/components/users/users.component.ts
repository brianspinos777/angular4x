import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment'; // for ENV



//========================================================= REDUX
import { NgRedux } from 'ng2-redux';
interface IAppState {
    counter: number
};

//=========================================================

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    result:any = "aaa"
    foobar:Array<number> = [1,2,3];
    foobar2:number[] = [1,2,3];

    // string, number, boolean, any, object

    apiUrl = environment.apiUrl;


    

  constructor(
    private activatedRoute: ActivatedRoute, 
    private http: Http,
    private ngRedux: NgRedux<IAppState> //======================================== REDUX
  ){

  }

  ngOnInit() {
  }

  getParams(){
    // alert(this.activatedRoute.snapshot.params.id)

    this.http.get(this.apiUrl + "foo")
    .map(res => res.json())
    .subscribe(res => {
        console.log(res)
        this.result = res
    })

    //========================================================= REDUX
    this.ngRedux.dispatch({type: 'FOO', payload: 5})
    //=========================================================

    let state = this.ngRedux.getState()
    console.log(state)
  }

  generatepasswordHash(){
    this.http.get(this.apiUrl + "pass")
    .map(res => res.json())
    .subscribe(res => {
        console.log(res)
        this.result = res
    })
  }

  checkpasswordHash(){
    this.http.get(this.apiUrl + "checkpass")
    .map(res => res.json())
    .subscribe(res => {
        console.log(res)
        this.result = res
    })
  }

  logEnv(){
      console.log(environment); // {production: true} 
  }

}
