import { Component, OnInit, Input } from '@angular/core';

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
	 * <app-my-child [myChildVar]="varFromParentComponent"></app-my-child>
	 *
	 *
	 * <!-- MyChildComponent view: -->
	 * <p>myChildVar: {{myChildVar}}</p>
	 */
	@Input() myChildVar: string

    constructor(){}

    ngOnInit(){}

}
