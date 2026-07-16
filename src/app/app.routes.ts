import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { MembresiasComponent } from './pages/membresias/membresias.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'membresias', component: MembresiasComponent }
];