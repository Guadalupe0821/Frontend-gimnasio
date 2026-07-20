import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-membresias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.css']
})
export class MembresiasComponent {
  mostrarModal = false;
  modoEdicion = false;
  indiceEdicion: number | null = null;
  filtroBusqueda: string = ''; // Variable para la barra de búsqueda

  // Lista de membresías con los datos en la tabla por defecto
  membresias: { nombre: string; precio: number }[] = [
    { nombre: 'Mensual', precio: 500 },
    { nombre: 'Semestral', precio: 2500 },
    { nombre: 'Anual', precio: 4500 }
  ];

  // Estructura del objeto para el formulario
  nuevaMembresia = { nombre: '', precio: null as number | null };

  // Getter para obtener la lista filtrada dinámicamente según la búsqueda
  get membresiasFiltradas() {
    return this.membresias.filter(m => 
      m.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
    );
  }

  abrirModal() {
    this.modoEdicion = false;
    this.mostrarModal = true;
  }

  // Editar usando el objeto para encontrar su posición real
  editarMembresia(membresia: any) {
    this.modoEdicion = true;
    this.indiceEdicion = this.membresias.findIndex(m => m === membresia);
    this.nuevaMembresia = { ...membresia };
    this.mostrarModal = true;
  }

  // Eliminar usando la referencia del objeto
  eliminarMembresia(membresia: any) {
    if (confirm('¿Estás seguro de eliminar esta membresía?')) {
      this.membresias = this.membresias.filter(m => m !== membresia);
    }
  }

  guardarMembresia() {
    // Validamos que se haya seleccionado un nombre y se haya puesto un precio válido
    if (!this.nuevaMembresia.nombre || this.nuevaMembresia.precio === null) return;

    if (this.modoEdicion && this.indiceEdicion !== null) {
      this.membresias[this.indiceEdicion] = { 
        nombre: this.nuevaMembresia.nombre, 
        precio: this.nuevaMembresia.precio 
      };
    } else {
      this.membresias.push({ 
        nombre: this.nuevaMembresia.nombre, 
        precio: this.nuevaMembresia.precio 
      });
    }
    this.cerrarModal();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevaMembresia = { nombre: '', precio: null };
    this.modoEdicion = false;
    this.indiceEdicion = null;
  }
}