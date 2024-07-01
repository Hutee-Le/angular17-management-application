import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fauth: Auth = inject(Auth);
  currentUser = new BehaviorSubject<User | null>(null);

  constructor() {
    onAuthStateChanged(this.fauth, user => {
      this.currentUser.next(user);
    });
  }

  async createAccount(username: string, password: string) {
    return await createUserWithEmailAndPassword(this.fauth, username, password)
      .then(result => {
        console.log('User created:', result.user);
        return result;
      })
      .catch(error => {
        console.error('Error creating user:', error);
        throw error;
      });
  }

  async login(username: string, password: string) {
    return await signInWithEmailAndPassword(this.fauth, username, password)
      .then(result => {
        console.log('User logged in:', result.user);
        return result;
      })
      .catch(error => {
        console.error('Error logging in:', error);
        throw error;
      });
  }

  async signinGmail() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.fauth, provider)
      .then(result => {
        console.log(result.user);
        return result.user;
      }).catch(error => {
        console.error('Error during Google sign-in:', error);
        throw error;
      });
  }

  async logout() {
    return await this.fauth.signOut()
      .then(() => {
        console.log('User logged out');
      }).catch(error => {
        console.error('Error during logout:', error);
        throw error;
      });
  }
}
