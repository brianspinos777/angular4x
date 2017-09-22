import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/items/item.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-edit-item',
    templateUrl: './edit-item.component.html',
    styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

    item:any

    constructor(
        private itemService:ItemService,
        private activatedRoute: ActivatedRoute, 
        private location: Location, 
    ){
        //...
    }

    ngOnInit(){
        let id = this.activatedRoute.snapshot.params.id
        this.itemService.find(id).subscribe((res)=>{
            console.log(res)
            this.item = res.data[0]
        })
    }

    updateItem(item){
        console.log(item)

        let id = this.activatedRoute.snapshot.params.id
        this.itemService.update(item).subscribe((res)=>{
            console.log(res)
        })
    }

    goBack(){
        this.location.back()
    }

}
