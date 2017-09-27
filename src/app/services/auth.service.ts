import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt'

@Injectable()
export class AuthService {

    constructor(){}

    isLoggedIn(){
        // return tokenNotExpired()

        let jwtHelper = new JwtHelper()
        let token = localStorage.getItem('token')

        if(!token)
            return false

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

}
