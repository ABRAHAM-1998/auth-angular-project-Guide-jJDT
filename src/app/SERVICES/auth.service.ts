import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "./model";
interface Login {
  uid: string;
  email: string;
  time: Date;
  location: string;
}
@Injectable({
  providedIn: "root",
})
export class AuthService {
  tests: Observable<any[]> | undefined;
  public Errormessage: any;

  public userData: User = {
    uid: "",
    email: "",
    displayName: "",
    photoURL: "",
    emailVerified: false,
    location: "",
    time: new Date(),
  };
  constructor(
    private snackBar: MatSnackBar,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log("user is loggred in here");
        this.userData.email = user.email!;
        this.userData.displayName = user.email!;
        this.userData.emailVerified = user.emailVerified;
        this.userData.uid = user.uid;

        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user")!);
      } else {
        localStorage.removeItem("user");
        JSON.parse(localStorage.getItem("user")!);
        this.SignOut;
      }
    });
  }
  // Sign in with email/password
  async SignIn(email: string, password: string) {
    this.snackBar.open("Logging in .. Please wait..", "Close", {
      duration: 5000,
      panelClass: ["snackbar"],
    });
    this.afAuth.setPersistence("session");
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        const login: Login = {
          uid: result.user!.uid,
          email: result.user!.email!,
          time: new Date(),
          location: "null",
        };
        this.SetUserData(result.user);
        if (result.user?.emailVerified == true) {
          const token = await result.user.getIdToken();
          sessionStorage.setItem("token", token);
        } else {
          this.snackBar.open(" FAILED..", "Close", {
            duration: 4000,
            panelClass: ["snackbar"],
          });
        }
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(["Home"]);
            this.snackBar.open("Logging in .. Please wait..", "Close", {
              duration: 3000,
              panelClass: ["snackbar-success"],
            });
          }
        });
      })

      .catch((error) => {
        this.showLoginError(error.code);
      });
  }
  showLoginError(errorCode: string) {
    let message: string;
    switch (errorCode) {
      case "auth/invalid-email":
        message = "Invalid email";
        break;
      case "auth/user-token-expired":
        message = "The user token has expired";
        break;
      case "auth/too-many-requests":
        message = "Too many requests. Try again later";
        break;
      case "auth/provider-already-linked":
        message = "The provider is already linked to this account";
        break;

      case "auth/account-exists-with-different-credential":
        message =
          "There is already an account with the same email address but different sign-in credentials";
        break;

      case "auth/user-disabled":
        message = "User account is disabled";
        break;
      case "auth/user-not-found":
        message = "Invalid email address or password";
        break;
      case "auth/wrong-password":
        message = "Invalid email address or password";
        break;
      default:
        message = "An error occurred. Please try again later.";
        break;
    }
    this.snackBar.open(message, "Close", {
      duration: 4000,
      panelClass: ["snackbar"],
    });
    this.Errormessage = message;
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then((res) => {
        this.snackBar.open(
          " EMAIL VERIFICATION SENDED SUCCESSFULLY..",
          "Close",
          {
            duration: 4000,
            panelClass: ["snackbar"],
          }
        );
        console.log(res.message);

        this.router.navigate(["verify-email-address"]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user !== null && user.emailVerified == true
      ? true
      : false && this.afAuth.currentUser;
  }

  async SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `ADMIN/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      location: "",
      time: new Date(),
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    sessionStorage.removeItem("token");
    return this.afAuth
      .signOut()
      .then((result) => {
        this.router.navigate(["/login"]);
        this.snackBar.open(" LOGOUT!!!..", "Close", {
          duration: 4000,
          panelClass: ["snackbar"],
        });
        // window.location.reload();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .catch((error) => {
        this.snackBar.open(" You have been successfully logged out.", "Close", {
          duration: 4000,
          panelClass: ["snackbar"],
        });
      });
  }

}