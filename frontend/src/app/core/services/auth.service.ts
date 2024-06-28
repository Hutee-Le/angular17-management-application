import { Injectable, inject } from '@angular/core';
import {Auth, createUserWithEmailAndPassword,  signInWithEmailAndPassword} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fauth:Auth = inject(Auth)

  constructor(private auth: Auth) {
    this.fauth = inject(Auth);
  }

  async createAccount(username: string, password: string) {
    return await createUserWithEmailAndPassword(this.fauth, username, password)
      .then(result => {
        var user = result.user;
        console.log('User created:', user);
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
        var user = result.user;
        console.log('User logged in:', user);
        return result;
      })
      .catch(error => {
        console.error('Error logging in:', error);
        throw error;
      });
  }
}
