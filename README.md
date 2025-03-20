<p align="center">
  <img src="https://media.tenor.com/XPRG-4ujVMIAAAAM/cat-work-in-progress.gif" alt="Work in Progress Cat GIF">
</p>

<h1 align="center">Ejercicio Portafolio</h1>

<p align="center">
  Trabajo de Síntesis sobre hacer un portafolio. Para el instituto. 🎓
</p>

---

## Descripción 📝

¡Hola! 👋
Este repositorio es para un trabajo que realicé, consiste en crear mi propio portafolio web (basado en que estamos en 2028). 🚀

### Cosas a tener en cuenta:
- He ocultado información privada como correos, números de teléfono, etc. 🔒

## Configuración de la Base de Datos 🗃️

### Creación del Usuario 👤

Para ejecutar las bases de datos que he incluido, primero necesitamos crear un usuario llamado:

- **Usuario:** `nuevo_usuario`
- **Contraseña:** `tu_contraseña` 🔑

### Creación de Bases de Datos 💾

A continuación, crearemos dos bases de datos:

1. **Base de datos `notificaciones`** 

   Para crear esta base de datos, debemos ejecutar el archivo `notificaciones.sql` con el siguiente comando:

   ```sql
   SOURCE /ruta/a/notificaciones.sql;
   ```
   **Contenido de `notificaciones.sql`:**
  ```sql
   DROP TABLE IF EXISTS `emails`;

CREATE TABLE `emails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `fecha_envio` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;  
   ```

2. **Base de datos `mensajes`**
   Para crear esta base de datos, debemos ejecutar el archivo `mensajes.sql` con el siguiente comando:

   ```sql
   SOURCE /ruta/a/mensajes.sql;
   ```
   **Contenido de `mensajes.sql`:**
  ```sql
DROP TABLE IF EXISTS `contact_messages`;

CREATE TABLE `contact_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 
   ```

## Acceso a la Web

En la web principal, si iniciamos sesión con los siguientes credenciales:

- **Usuario:** `admin`
- **Contraseña:** `password` 🔑

Y luego presionamos la combinación de teclas: **`a`, `a`, `7`, `3`**, seremos redirigidos a una página donde se mostrarán los mensajes de contacto almacenados en la base de datos.

<p align="center">
    <img src="https://www.gifsanimados.org/data/media/90/fuego-imagen-animada-0419.gif" alt="Fuego" width="100%" height="100"><br>
</p>
