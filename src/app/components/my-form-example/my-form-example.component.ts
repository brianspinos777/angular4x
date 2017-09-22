import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

// Dont forget to include ReactiveFormsModule in your module: 
// import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

@Component({
    selector: 'app-my-form-example',
    templateUrl: './my-form-example.component.html',
    styleUrls: ['./my-form-example.component.css']
})
export class MyFormExampleComponent implements OnInit {

    myForm:any;

    constructor(){}

    ngOnInit(){
        this.myForm = new FormGroup({
            firstName: new FormControl("", Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.pattern('[\\w\\-\\s\\/]+'),
            ])),
            lastName: new FormControl("", this.textValidator), // custom validator
            languages: new FormControl("", Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.pattern('[\\w\\-\\s\\/]+'),
            ])),
        })
    }

    textValidator(control){
        if(control.value.length < 3){
            return {'lastName': true}
        }
    }

    onSubmit(data, myForm){
        console.log(data) // {firstName: "brian", lastName: "spinos", languages: "PHP"}

        console.log(myForm)
    }


}
