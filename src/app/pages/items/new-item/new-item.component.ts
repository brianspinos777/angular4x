import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/items/item.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-new-item',
    templateUrl: './new-item.component.html',
    styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

    item: object = {
        id: null,
        text: '',
        is_done: false
    };

    constructor(
        private itemService: ItemService,
        private activatedRoute: ActivatedRoute,
        private location: Location,
    ){
        //...
    }

    ngOnInit(){
        // let id = this.activatedRoute.snapshot.params.id
        // this.itemService.find(id)
        // .subscribe(
        //     (res) => {
        //         console.log(res)
        //         this.item = res.data[0]
        //     },
        //     (error:Response) => {
        //         console.log("ERROR:", error)
        //     }
        // )
    }

    saveItem(item){
        console.log(item);

        // let id = this.activatedRoute.snapshot.params.id
        this.itemService.save(item)
        .subscribe(
            (res) => {
                console.log(res);
                if (res.success){
                    //...
                    alert('Item was successfuly created!');
                }else{
                    //...
                }
            },
            (error: Response) => {
                console.log('ERROR:', error);
            }
        );
    }

    goBack(){
        this.location.back();
    }

}
