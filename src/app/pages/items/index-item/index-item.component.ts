import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/items/item.service';

@Component({
    selector: 'app-index-item',
    templateUrl: './index-item.component.html',
    styleUrls: ['./index-item.component.css']
})
export class IndexItemComponent implements OnInit {

    items:Array<object>

    constructor(
        //...
        private itemService:ItemService
    ){
        //...
    }

    ngOnInit(){
        this.itemService.all().subscribe((res)=>{
            console.log(res)
            this.items = res.data
        })
    }

}
