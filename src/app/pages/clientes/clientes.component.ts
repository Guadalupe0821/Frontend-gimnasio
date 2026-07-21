import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClienteService } from '../../services/cliente.service';
import { MembresiaService } from '../../services/membresia.service';
import { Cliente } from '../../models/cliente';
import { Membresia } from '../../models/membresia';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  mostrarModal = false;
  filtroBusqueda = '';
  clientes: Cliente[] = [];
  membresias: Membresia[] = [];

  nuevoCliente: Cliente = {
    nombre: '',
    correo: '',
    telefono: '',
    membresia: undefined
  };

  constructor(
    private clienteService: ClienteService,
    private membresiaService: MembresiaService
  ) { }

  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerMembresias();
  }

  obtenerClientes() {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        console.log(data);
      },
      error: (error) => {
        console.error("Error al obtener clientes", error);
      }
    });
  }

  obtenerMembresias() {
    this.membresiaService.getMembresias().subscribe({
      next: (data) => {
        this.membresias = data;
        console.log('Membresías recibidas:', data);
      },
      error: (error) => {
        console.error("Error al obtener membresías", error);
      }
    });
  }

  get clientesFiltrados() {
    return this.clientes.filter(cliente =>
      cliente.nombre?.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
    );
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevoCliente = {
      nombre: '',
      correo: '',
      telefono: '',
      membresia: undefined
    };
  }

  guardarCliente() {
    if (this.nuevoCliente.idCliente) {
      this.clienteService.actualizarCliente(this.nuevoCliente.idCliente, this.nuevoCliente).subscribe({
        next: () => {
          this.obtenerClientes();
          this.cerrarModal();
        },
        error: (error) => {
          console.error("Error al actualizar", error);
        }
      });
    } else {
      this.clienteService.guardarCliente(this.nuevoCliente).subscribe({
        next: () => {
          this.obtenerClientes();
          this.cerrarModal();
        },
        error: (error) => {
          console.error("Error al guardar", error);
        }
      });
    }
  }

  eliminarCliente(id: number) {
    if (confirm("¿Eliminar cliente?")) {
      this.clienteService.eliminarCliente(id).subscribe({
        next: () => {
          this.obtenerClientes();
        },
        error: (error) => {
          console.error("Error al eliminar", error);
        }
      });
    }
  }

  editarCliente(cliente: Cliente) {
    const membresiaAsignada = this.membresias.find(
      m => m.idMembresia === cliente.membresia?.idMembresia
    );

    this.nuevoCliente = {
      idCliente: cliente.idCliente,
      nombre: cliente.nombre,
      correo: cliente.correo,
      telefono: cliente.telefono,
      membresia: membresiaAsignada
    };

    this.mostrarModal = true;
  }
}
