import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({ selector: 'app-register', standalone: true, imports: [ReactiveFormsModule, RouterLink], templateUrl: './register.component.html', styleUrl: './register.component.scss' })
export class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly form = this.formBuilder.nonNullable.group({ first_name: ['', [Validators.required, Validators.maxLength(100)]], last_name: ['', [Validators.required, Validators.maxLength(100)]], email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(8)]] });
  loading = false;
  error = '';
  success = '';

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.error = '';
    this.auth.register(this.form.getRawValue()).subscribe({
      next: (response) => { this.success = response.message; setTimeout(() => void this.router.navigate(['/login']), 800); },
      error: (error: { error?: { message?: string } }) => { this.error = error.error?.message ?? 'No se pudo crear la cuenta.'; this.loading = false; },
      complete: () => (this.loading = false),
    });
  }
}
