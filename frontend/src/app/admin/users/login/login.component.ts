import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  authSrv: AuthService = inject(AuthService);
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  snackBar: MatSnackBar = inject(MatSnackBar);

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  tryLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authSrv.login(email, password)
        .then(user => {
          console.log(user);
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          this.router.navigate(['/admin']);
        }).catch(error => {
          console.error('Error during regular login:', error);
          this.snackBar.open('Login failed. Please try again.', 'Close', { duration: 3000 });
        });
    }
  }

  tryGoogleLogin() {
    this.authSrv.signinGmail()
      .then(user => {
        console.log(user);
        this.snackBar.open('Google login successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/admin']);
      }).catch(error => {
        console.error('Error during Google login:', error);
        this.snackBar.open('Google login failed. Please try again.', 'Close', { duration: 3000 });
      });
  }
}
