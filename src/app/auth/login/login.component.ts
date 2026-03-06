import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']

})
export class LoginComponent {
    email = '';       // <-- hier
  password = '';
  error = '';

 constructor( private auth: AuthService, private router: Router  ) {}
 login() {
   this.auth.login(this.email, this.password).subscribe({
     next: () => {
       this.error = '';
       alert('Login erfolgreich!');
 this.router.navigate(['/home']);     },
     error: err => {
       this.error = err.error?.message || 'Login failed';
     }
   });
 }

}
