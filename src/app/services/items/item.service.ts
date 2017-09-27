import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment'; // for ENV
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from 'ng2-redux';
import { INITIAL_STATE, IAppState } from '../../redux/app.state'


@Injectable()
export class ItemService {

    apiUrl = environment.apiUrl;

    constructor(
        private http: Http,
        private ngRedux: NgRedux<IAppState>
    ){
        //...
    }

    // usage: this.itemService.save(item).subscribe((res)=>{...})
    save(item){
        return this.http.post(this.apiUrl + 'items', item)
        .map(res => res.json())
    }

    // usage: this.itemService.update(item).subscribe((res)=>{...})
    update(item){
        return this.http.put(this.apiUrl + `items/${item.id}`, item)
        .map(res => res.json())
    }

    // usage: this.itemService.delete(1).subscribe((res)=>{...})
    delete(id){
        return this.http.delete(this.apiUrl + `items/${id}`)
        .map(res => res.json())
    }

    // usage: this.itemService.find(1).subscribe((res)=>{...})
    find(id){
        return this.http.get(this.apiUrl + `items/${id}`)
        .map(res => res.json())
    }

    // usage: this.itemService.where({text: 'foo'}).subscribe((res)=>{...})
    where(attributes){
        return this.http.get(this.apiUrl + 'items')
        .map(res => res.json())
    }


    // usage: this.itemService.all().subscribe((res)=>{...})
    all(){
        return this.http.get(this.apiUrl + "items")
        .map(res => res.json())
    }

    order(options){
        //....
    }



}
