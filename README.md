# Gimnasio

Aplicación web para la gestión de un gimnasio, desarrollada con Angular 17 y Tailwind CSS.

## Funcionalidades

- **Login** - Autenticación de usuarios.
- **Clientes** - Gestión de clientes del gimnasio (nombre, correo, teléfono, membresía asociada).
- **Membresías** - Administración de membresías (nombre, precio).
- **Sidebar** - Navegación lateral.

## Estructura del proyecto

```
src/app/
├── components/sidebar/     # Componente de navegación lateral
├── pages/
│   ├── login/              # Página de inicio de sesión
│   ├── clientes/           # Gestión de clientes
│   └── membresias/         # Gestión de membresías
├── models/
│   ├── cliente.ts          # Interfaz Cliente
│   └── membresia.ts        # Interfaz Membresía
└── services/
    ├── auth.service.ts     # Servicio de autenticación
    ├── cliente.service.ts  # Servicio de clientes
    └── membresia.service.ts # Servicio de membresías
```

## Tecnologías

- **Angular** 17.3
- **Tailwind CSS** 3.4
- **TypeScript** 5.4
- **Karma** + **Jasmine** (testing)

## Desarrollo

```bash
# Instalar dependencias
npm install

# Ej servidor de desarrollo
ng serve

# Abrir en http://localhost:4200/
```

## Build

```bash
ng build
```

Los archivos de producción se generarán en `dist/gimnasio/`.

## Tests

```bash
ng test
```
