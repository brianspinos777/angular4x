import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt'
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment'; // for ENV

@Injectable()
export class AuthService {

    apiUrl = environment.apiUrl;

    constructor(
        private http: Http,
        private router:Router
    ){
        //...
    }

    isLoggedIn(){
        // return tokenNotExpired()

        let jwtHelper = new JwtHelper()
        let token = localStorage.getItem('token')

        if(!token)
            return false;

        let expirationDate = jwtHelper.getTokenExpirationDate(token)
        let isExpired = jwtHelper.isTokenExpired(token)

        return !isExpired
    }

    get currentUser(){
        let token = localStorage.getItem('token')

        if(!token)
            return null

        let jwtHelper = new JwtHelper()
        return jwtHelper.decodeToken(token)
    }

    saveTokenToLocalStorage(token){
        localStorage.setItem('token', token)
    }



    // usage: this.authService.authenticate({email: 'aaa@bbb.com', password: 'password'})
    authenticate(credentials){
        return this.http.post(this.apiUrl + 'auth', credentials)
        .map(res => res.json())
        .subscribe((res)=>{
            console.log(res)

            if(res.success){
                this.saveTokenToLocalStorage(res.data.token)
                this.router.navigate(['/'])
            }
            
        })
    }

    // usage: this.authService.logout()
    logout(){
        localStorage.setItem('token', null)
        this.router.navigate(['/login'])
    }

}
