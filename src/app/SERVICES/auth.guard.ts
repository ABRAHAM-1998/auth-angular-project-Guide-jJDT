import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin(state.url);
  }
  checkLogin(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe((user) => {
        if (user && this.auth.isLoggedIn) {
          resolve(true); 
        } else {
          this.auth.SignOut();
          this.router.navigate(["/login"]);
          resolve(false); 
        }
      });
    });
  }
}
