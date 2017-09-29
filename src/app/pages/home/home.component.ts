import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    currentUser:object

    constructor(
        private authService:AuthService
    ){
        //...
    }

    ngOnInit(){
        let currentUser = this.authService.currentUser
        this.currentUser = currentUser
    }

    verifyToken(){
        this.authService.verifyToken()
    }

    logout(){
        this.authService.logout()
    }
}
