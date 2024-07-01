import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  fauth:Auth = inject(Auth)
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      onAuthStateChanged(this.fauth,         
        user=>{
        if (user) {
          console.log("user service", user)
          resolve(user);
        } else {				 
          reject('No user logged in');
        }
        }
      )}
    )
  }
}
