import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { Membresia } from '../../models/membresia';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  mostrarModal = false;
  filtroBusqueda = '';
  clientes: Cliente[] = [];
  membresias: Membresia[] = []; // <-- Necesita llenarse

  nuevoCliente: Cliente = {
    nombre: '',
    correo: '',
    telefono: '',
    membresia: undefined
  };

  constructor(
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerMembresias(); // <-- CORRECCIÓN 1: Llamamos a la función al iniciar
  }

  obtenerClientes() {
    this.clienteService.getClientes()
      .subscribe({
        next: (data) => {
          this.clientes = data;
          console.log(data);
        },
        error: (error) => {
          console.error("Error al obtener clientes", error);
        }
      });
  }

  // CORRECCIÓN 1: Traer las membresías desde tu servicio o base de datos
  obtenerMembresias() {
    // NOTA: Si tienes un 'MembresiaService' independiente, recuerda inyectarlo en el constructor.
    // Aquí asumo que está dentro de clienteService o puedes adaptarlo a tu servicio correspondiente:
    this.clienteService.getMembresias() 
      .subscribe({
        next: (data) => {
          this.membresias = data;
        },
        error: (error) => {
          console.error("Error al obtener membresías", error);
        }
      });
  }

  get clientesFiltrados() {
    return this.clientes.filter(cliente =>
      cliente.nombre
        ?.toLowerCase()
        .includes(this.filtroBusqueda.toLowerCase())
    );
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    // CORRECCIÓN 2: Asegurar que se resetee la propiedad membresía correctamente
    this.nuevoCliente = {
      nombre: '',
      correo: '',
      telefono: '',
      membresia: undefined
    };
  }

  guardarCliente() {
    if (this.nuevoCliente.idCliente) {
      this.clienteService
        .actualizarCliente(this.nuevoCliente.idCliente, this.nuevoCliente)
        .subscribe({
          next: () => {
            this.obtenerClientes();
            this.cerrarModal(); // Usamos cerrarModal para que limpie todo bien
          },
          error: (error) => {
            console.error("Error al actualizar", error);
          }
        });
    } else {
      this.clienteService
        .guardarCliente(this.nuevoCliente)
        .subscribe({
          next: () => {
            this.obtenerClientes();
            this.cerrarModal(); // Usamos cerrarModal para que limpie todo bien
          },
          error: (error) => {
            console.error("Error al guardar", error);
          }
        });
    }
  }

  eliminarCliente(id: number) {
    if (confirm("¿Eliminar cliente?")) {
      this.clienteService
        .eliminarCliente(id)
        .subscribe({
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
    // CORRECCIÓN 3: Mapear la membresía actual del cliente al formulario de edición.
    // Para que Angular seleccione el <option> correcto, los objetos deben ser exactamente idénticos,
    // por lo que buscamos la coincidencia dentro del arreglo cargado.
    const membresiaAsignada = this.membresias.find(m => m.idMembresia === cliente.membresia?.idMembresia);

    this.nuevoCliente = {
      idCliente: cliente.idCliente,
      nombre: cliente.nombre,
      correo: cliente.correo,
      telefono: cliente.telefono,
      membresia: membresiaAsignada || undefined // Asigna la membresía encontrada o undefined
    };

    this.mostrarModal = true;
  }
}