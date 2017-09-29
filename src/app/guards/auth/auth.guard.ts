import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        if(this.authService.isLoggedIn()){
            return true
        }else{
            this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
            return false
        }
    }

    // localStorage.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0MTY5MjkxMDksImp0aSI6ImFhN2Y4ZDBhOTVjIiwic2NvcGVzIjpbInJlcG8iLCJwdWJsaWNfcmVwbyJdfQ.XCEwpBGvOLma4TCoh36FU7XhUbcskygS81HE1uHLf0E'
}
