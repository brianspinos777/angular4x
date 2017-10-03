import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// Dont forget to include ReactiveFormsModule in your module:
// import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

@Component({
    selector: 'app-my-form-example',
    templateUrl: './my-form-example.component.html',
    styleUrls: ['./my-form-example.component.css']
})
export class MyFormExampleComponent implements OnInit {

    myForm: FormGroup;
    fb: FormBuilder;

    constructor(fb: FormBuilder){
        this.fb = fb;
    }

    ngOnInit(){

        //================================== ATTENTION =========================
        //
        // FormBuilder : there is a way to write less code with 'Reactive forms', use `FormBuilder`
        this.useFormBuilder(this.fb);
        //
        //======================================================================

        // FormGroup makes it easy to group many inputs and validate the whole form!
        // 'Reactive forms' => Forms built this way are called 'Reactive forms',
        // 'Template driven forms' => and simple forms that are only coded on the view are called 'Template driven forms' and they use ngModel on the view
        
        // this.myForm = new FormGroup({

        //     // keys here should match the 'formControlName' attributes in the form, in the view.

        //     // 'someComplexObject': new FormGroup({}), // FormGroup is nestable! remember to use 'formGroupName' in the template though.
        //     'firstName': new FormControl('', Validators.compose([
        //         Validators.required,
        //         Validators.minLength(3),
        //         Validators.pattern('[a-zA-Z]+'),
        //     ])),
        //     'lastName': new FormControl('', this.textValidator), // custom validator
        //     'languages': new FormControl('', Validators.compose([
        //         Validators.required,
        //         Validators.minLength(3),
        //         Validators.pattern('[a-zA-Z]+'),
        //     ])),
        //     'checkbox_a': new FormControl('', Validators.compose([])),
        //     'checkbox_b': new FormControl('', Validators.compose([])),
        //     'email': new FormControl('', Validators.compose([])),
        //     'password': new FormControl('', Validators.compose([])),
        // });
    }

    textValidator(control){
        if (control.value.length < 6){
            return {
                'lastName': true, // myForm.get('lastName').errors.lastName
                'myMinlength': {
                    myRequiredLength: 6 // myForm.get('lastName').errors.myMinlength.myRequiredLength
                }
            };
        }
    }

    onSubmit(data, myForm){
        console.log(data); // {firstName: "brian", lastName: "spinos", languages: "PHP"}

        console.log(myForm); // FormGroup obj
    }

    log(data){
        console.log(data);
    }

    useFormBuilder(fb: FormBuilder){

        /*
        // FormBuilder example:
        this.myForm = fb.group({
            name: [initialValue, validators, asyncValidators],
            contact: fb.group({
                email: [initialValue, validators, asyncValidators],
                phone: [initialValue, validators, asyncValidators]
            }),
            topics: fb.array([])
        })
        */

        this.myForm = fb.group({
            // keys here should match the 'formControlName' attributes in the form, in the view.

            // 'someComplexObject': fb.group({}), // fb.group({}) is nestable! remember to use 'formGroupName' in the template though.

            'firstName': ['Brian', [
                Validators.required,
                Validators.minLength(3),
                Validators.pattern('[a-zA-Z]+')
            ], []],
            'lastName': ['', [
                Validators.required,
                // Validators.minLength(3),
                Validators.pattern('[a-zA-Z]+'),
                this.textValidator // custom validator
            ], []],
            'languages': ['', [
                Validators.required
            ], []],
            'checkbox_a': ['', [
                Validators.required
            ], []],
            'checkbox_b': ['', [
                Validators.required
            ], []],
            'email': ['', [
                Validators.required
            ], []],
            'password': ['', [
                Validators.required
            ], []],
        }) 
    }

    submitForm2(formObj){
        console.log(formObj.value);
    }

}
