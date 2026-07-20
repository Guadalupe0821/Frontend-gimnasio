import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    if (this.usuario === 'admin' && this.password === '12345') {
      localStorage.setItem('logueado', 'true');
      this.router.navigate(['/clientes']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

}