import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/items/item.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css']
})
export class ShowItemComponent implements OnInit {

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
        this.itemService.find(id)
        .subscribe(
            (res) => {
                console.log(res)
                this.item = res.data[0]
            }, 
            (error:Response) => {
                console.log("ERROR:", error)
            }
        )
    }

    goBack(){
        this.location.back()
    }

}
