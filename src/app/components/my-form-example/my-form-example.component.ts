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

    myForm:FormGroup;

    constructor(){}

    ngOnInit(){

        // FormGroup makes it easy to group many inputs and validate the whole form!
        // Forms built this way are called 'Reactive forms',
        // and simple forms that are only coded on the view are called 'Template driven forms' and they use ngModel on the view
        this.myForm = new FormGroup({

            // keys here should match the 'formControlName' attributes in the form, in the view.

            // 'someComplexObject': new FormGroup({}), // FormGroup is nestable!
            'firstName': new FormControl("", Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.pattern('[\\w\\-\\s\\/]+'),
            ])),
            'lastName': new FormControl("", this.textValidator), // custom validator
            'languages': new FormControl("", Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.pattern('[\\w\\-\\s\\/]+'),
            ])),
            'checkbox_a': new FormControl("", Validators.compose([])),
            'checkbox_b': new FormControl("", Validators.compose([])),
            'email': new FormControl("", Validators.compose([])),
            'password': new FormControl("", Validators.compose([])),
        })
    }

    textValidator(control){
        if(control.value.length < 3){
            return {'lastName': true}
        }
    }

    onSubmit(data, myForm){
        console.log(data) // {firstName: "brian", lastName: "spinos", languages: "PHP"}

        console.log(myForm) // FormGroup obj
    }

    log(data){
        console.log(data)
    }


}
