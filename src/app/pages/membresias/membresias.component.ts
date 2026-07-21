// src/app/pages/membresias/membresias.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MembresiaService } from '../../services/membresia.service';
import { Membresia } from '../../models/membresia';

@Component({
  selector: 'app-membresias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.css']
})
export class MembresiasComponent implements OnInit {
  mostrarModal = false;
  modoEdicion = false;
  filtroBusqueda: string = '';
  membresias: Membresia[] = [];
  filtro: string = '';

  nuevaMembresia: Membresia = { nombreMembresia: '', precio: 0 };

  constructor(private membresiaService: MembresiaService) {}

  ngOnInit(): void {
    this.obtenerMembresias();
  }

  obtenerMembresias() {
  this.membresiaService.getMembresias().subscribe({
    next: (data) => {
      this.membresias = data;
      console.log('Membresías recibidas:', JSON.stringify(data, null, 2)); 
    },
    error: (err) => alert('Error al obtener membresías')
  });
}

  get membresiasFiltradas() {
    return this.membresias.filter(m =>
      m.nombreMembresia.toLowerCase().includes(this.filtroBusqueda.toLowerCase()),
    );
  }

  

  abrirModal() {
    this.modoEdicion = false;
    this.nuevaMembresia = { nombreMembresia: '', precio: 0 };
    this.mostrarModal = true;
  }

  editarMembresia(membresia: Membresia) {
    this.modoEdicion = true;
    this.nuevaMembresia = { ...membresia };
    this.mostrarModal = true;
  }

 eliminarMembresia(membresia: Membresia) {
  const id = membresia.idMembresia;
  if (id === undefined) return;

  if (confirm('¿Estás seguro de eliminar esta membresía?')) {
    this.membresiaService.eliminarMembresia(id).subscribe({
      next: () => this.obtenerMembresias(),
      error: () => alert('Error al eliminar')
    });
  }
}

  guardarMembresia() {
  if (!this.nuevaMembresia.nombreMembresia || this.nuevaMembresia.precio == null) return;

  const id = this.nuevaMembresia.idMembresia;

  if (this.modoEdicion && id !== undefined) {
    this.membresiaService.actualizarMembresia(id, this.nuevaMembresia).subscribe({
      next: () => { this.obtenerMembresias(); this.cerrarModal(); },
      error: () => alert('Error al actualizar')
    });
  } else {
    this.membresiaService.guardarMembresia(this.nuevaMembresia).subscribe({
      next: () => { this.obtenerMembresias(); this.cerrarModal(); },
      error: () => alert('Error al guardar')
    });
  }
}

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevaMembresia = { nombreMembresia: '', precio: 0 };
    this.modoEdicion = false;
  }
}
