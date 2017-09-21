import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-child',
  templateUrl: './my-child.component.html',
  styleUrls: ['./my-child.component.css']
})
export class MyChildComponent implements OnInit {


	/**
	 * Pass values from the parent component to the child component,
	 * the values use two-way-data-binding.
	 *
	 * Usage:
	 * <!-- Inside parent component -->
	 * <app-my-child [myVarFromParent]="varFromParentComponent"></app-my-child>
	 *
	 *
	 * <!-- MyChildComponent view: -->
	 * <p>myVarFromParent: {{myVarFromParent}}</p>
	 */
	@Input() myVarFromParent: string


	@Output() myEvent:EventEmitter<string> = new EventEmitter()
	toBeSentToParent:string = " C"
    toBeSetByParent:string = "" // = myVarFromParent

    constructor(){}

    ngOnInit(){}

    sendDataToParentComponent(){
    	this.myEvent.emit(this.toBeSentToParent)
    }

}
