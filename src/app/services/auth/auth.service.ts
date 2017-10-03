import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment'; // for ENV

@Injectable()
export class AuthService {

    apiUrl: string = environment.apiUrl;

    constructor(
        private http: Http,
        private router: Router
    ){
        //...
    }

    isLoggedIn(){
        // return tokenNotExpired()

        const jwtHelper = new JwtHelper();
        const token = localStorage.getItem('token');

        if (!token)
            return false;

        const expirationDate = jwtHelper.getTokenExpirationDate(token);
        const isExpired = jwtHelper.isTokenExpired(token);

        return !isExpired;
    }

    get currentUser(){
        const token = localStorage.getItem('token');

        if (!token)
            return null;

        const jwtHelper = new JwtHelper();
        return jwtHelper.decodeToken(token);
    }

    saveTokenToLocalStorage(token){
        localStorage.setItem('token', token);
    }



    // usage: this.authService.authenticate({email: 'aaa@bbb.com', password: 'password'})
    authenticate(credentials){
        return this.http.post(this.apiUrl + 'auth', credentials)
        .map(res => res.json())
        .subscribe((res) => {
            console.log(res);

            if (res.success){
                this.saveTokenToLocalStorage(res.data.token);
                this.router.navigate(['/']);
            }

        });
    }

    // usage: this.authService.logout()
    logout(){
        localStorage.setItem('token', null);
        this.router.navigate(['/login']);
    }

    verifyToken(){
        const token = localStorage.getItem('token');

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        const opts = new RequestOptions();
        opts.headers = headers;

        return this.http.get(this.apiUrl + 'verify', opts)
        .map(res => res.json())
        .subscribe((res) => {
            console.log(res);
        });
    }
}
