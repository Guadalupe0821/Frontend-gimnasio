<div align="center">

# 🏋️ Gimnasio

### Sistema de gestión para gimnasio

![Angular](https://img.shields.io/badge/Angular-17.3-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

</div>

---

## ✨ Funcionalidades

| Módulo | Descripción |
|--------|-------------|
| 🔐 **Login** | Autenticación de usuarios |
| 👥 **Clientes** | Alta, baja y edición de clientes (nombre, correo, teléfono, membresía) |
| 💳 **Membresías** | Administración de planes y precios |
| 📋 **Sidebar** | Navegación lateral entre módulos |

---

## 📂 Estructura del proyecto

```
src/app/
├── components/sidebar/        # Navegación lateral
├── pages/
│   ├── login/                 # Inicio de sesión
│   ├── clientes/              # Gestión de clientes
│   └── membresias/            # Gestión de membresías
├── models/
│   ├── cliente.ts             # Interfaz Cliente
│   └── membresia.ts           # Interfaz Membresía
└── services/
    ├── auth.service.ts        # Autenticación
    ├── cliente.service.ts     # Clientes
    └── membresia.service.ts   # Membresías
```

---

## 🚀 Inicio rápido

```bash
# Clonar el repositorio
git clone https://github.com/Guadalupe0821/Frontend-gimnasio.git

# Instalar dependencias
npm install

# Levantar servidor de desarrollo
ng serve
```

Abrir [http://localhost:4200](http://localhost:4200)

---

## 🛠️ Comandos útiles

| Comando | Descripción |
|---------|-------------|
| `ng serve` | Servidor de desarrollo |
| `ng build` | Build de producción (`dist/gimnasio/`) |
| `ng test` | Ejecutar tests unitarios |

---

## 🧪 Testing

```bash
ng test
```

Tests unitarios ejecutados con **Karma** y **Jasmine**.
