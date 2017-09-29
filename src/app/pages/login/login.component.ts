import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    myForm:FormGroup;

    constructor(
        private authService:AuthService
    ){
        //...
    }

    ngOnInit(){

        //================================== ATTENTION =========================
        //
        // FormBuilder : there is a way to write less code with 'Reactive forms', use `FormBuilder`
        //
        //======================================================================

        // FormGroup makes it easy to group many inputs and validate the whole form!
        // Forms built this way are called 'Reactive forms',
        // and simple forms that are only coded on the view are called 'Template driven forms' and they use ngModel on the view
        this.myForm = new FormGroup({

            // keys here should match the 'formControlName' attributes in the form, in the view.

            // 'someComplexObject': new FormGroup({}), // FormGroup is nestable! remember to use 'formGroupName' in the template though.

            'email': new FormControl("", Validators.compose([])),
            'password': new FormControl("", Validators.compose([])),
        })
    }

    textValidator(control){
        if(control.value.length < 3){
            return {'lastName': true}
        }
    }

    onSubmit(credentials, myForm){
        console.log(credentials) // {userName: "brian", lastName: "spinos", languages: "PHP"}
        console.log(myForm) // FormGroup obj

        this.authService
        .authenticate({email: credentials.email, password: credentials.password})
        
    }

    log(credentials){
        console.log(credentials)
    }

}
