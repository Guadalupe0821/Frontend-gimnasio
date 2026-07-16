import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  mostrarModal = false;
  modoEdicion = false;
  indiceEdicion: number | null = null;
  filtroBusqueda: string = ''; // Nueva variable para la búsqueda

  clientes: { nombre: string; correo: string; telefono: string }[] = [];
  nuevoCliente = { nombre: '', correo: '', telefono: '' };

  // Getter para obtener la lista filtrada
  get clientesFiltrados() {
    return this.clientes.filter(c => 
      c.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
      c.correo.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
    );
  }

  abrirModal() {
    this.modoEdicion = false;
    this.mostrarModal = true;
  }

  
    // Editar usando el objeto, no el índice
  editarCliente(cliente: any) {
    this.modoEdicion = true;
    // Buscamos el índice real en la lista original
    this.indiceEdicion = this.clientes.findIndex(c => c === cliente);
    this.nuevoCliente = { ...cliente };
    this.mostrarModal = true;
  }

  // Eliminar usando el objeto
  eliminarCliente(cliente: any) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      // Filtramos la lista original quitando el objeto específico
      this.clientes = this.clientes.filter(c => c !== cliente);
    }
  }

  guardarCliente() {
    if (this.modoEdicion && this.indiceEdicion !== null) {
      this.clientes[this.indiceEdicion] = { ...this.nuevoCliente };
    } else {
      this.clientes.push({ ...this.nuevoCliente });
    }
    this.cerrarModal();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevoCliente = { nombre: '', correo: '', telefono: '' };
    this.modoEdicion = false;
    this.indiceEdicion = null;
  }
}