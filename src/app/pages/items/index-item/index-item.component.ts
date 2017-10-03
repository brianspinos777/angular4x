import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/items/item.service';

@Component({
    selector: 'app-index-item',
    templateUrl: './index-item.component.html',
    styleUrls: ['./index-item.component.css']
})
export class IndexItemComponent implements OnInit {

    items: Array<object>;

    constructor(
        //...
        private itemService: ItemService
    ){
        //...
    }

    ngOnInit(){
        this.itemService.all()
        .subscribe(
            (res) => {
                console.log(res);

                if (res.success){
                    this.items = res.data;
                }else{
                    //...
                }

            },
            (error: Response) => {
                console.log('ERROR:', error);
            }
        );
    }

    deleteItem(item){
        const answer = confirm('Are you sure?');

        if (answer === true){
            // delete item
            this.itemService.delete(item.id)
            .subscribe(
                (res) => {
                    console.log(res);

                    if (res.success){
                        this.items = this.items.filter(i => (i as {id: number}).id !== item.id); // TODO: use Redux
                        alert('Item successfully deleted!');
                    }else{
                        //...
                    }

                },
                (error: Response) => {
                    console.log('ERROR:', error);
                }
            );

        }else{
            //...
        }
    }

}
