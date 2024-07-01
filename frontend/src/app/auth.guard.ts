import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './core/services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state): Promise<boolean> | boolean => {
  const userService = inject(UserService)
  const router = inject(Router)
  return new Promise((resolve,reject)=>{
  userService.getCurrentUser() 
    .then(user=>{
      resolve(true)
    }, 
    err=>{
    resolve(false);
    router.navigate(["/login"]);
    }
  )
  }) 
};