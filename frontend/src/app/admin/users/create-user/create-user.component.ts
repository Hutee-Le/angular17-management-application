import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService, private userService: UserService, private router: Router) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      gender: ['', Validators.required],
      uploadPhoto: [''],
      role: ['', Validators.required],
      activated: [false],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
      })
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const { email, password } = this.userForm.value;

      // Tạo tài khoản người dùng trong Firebase Authentication
      this.authService.createAccount(email, password)
        .then(() => {
          this.userService.createUser(this.userForm.value)
            .subscribe(
              (response) => {
                console.log('User created successfully', response);
                this.router.navigate(['/admin/users']);
              },
              (error) => {
                console.error('Error creating user', error);
              }
            );
        })
        .catch((error) => {
          console.error('Error creating account:', error);
        });
    }
  }
}
