# Contador Manual de Personas

Este proyecto es una aplicación desarrollada con Vue.js que permite contar manualmente el número de personas. Utiliza Vue Router para la navegación, Pinia para la gestión del estado, Axios para el consumo de API, Socket.IO para la comunicación en tiempo real y Bootstrap para el diseño de la interfaz de usuario.

## Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Dependencias Principales](#dependencias-principales)
- [Manejo de Eventos y Estado](#manejo-de-eventos-y-estado)
- [Estilos y Diseño](#estilos-y-diseño)
- [Pruebas](#pruebas)
- [Mejores Prácticas y Consideraciones de Seguridad](#mejores-prácticas-y-consideraciones-de-seguridad)
- [Referencias y Recursos Adicionales](#referencias-y-recursos-adicionales)
- [Licencia](#licencia)

## Características

- Incrementar y decrementar manualmente el contador de personas.
- Comunicación en tiempo real con el servidor utilizando Socket.IO.
- Gestión del estado global con Pinia.
- Diseño responsivo con Bootstrap.

## Requisitos Previos

Asegúrate de tener instalados los siguientes componentes en tu sistema:

- [Node.js](https://nodejs.org/es/download/) (versión 14 o superior)
- [npm](https://www.npmjs.com/get-npm) (versión 6 o superior)

Puedes verificar las versiones instaladas ejecutando:

bash
node -v
npm -v

## Instalación
Sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local:

# Clonar el repositorio:

bash
Copiar código
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
Instalar las dependencias:

bash
Copiar código
npm install
Configuración
Antes de ejecutar la aplicación, es necesario configurar las variables de entorno:

# Crear un archivo .env en la raíz del proyecto con el siguiente contenido:

bash
Copiar código
VITE_API_URL=https://ikcount.com/iklab/ikcount/api/counting/command
VITE_ACCESS_TOKEN=tu_token_de_acceso
Reemplaza tu_token_de_acceso con el token proporcionado para la API.

# Uso
Para iniciar la aplicación en modo de desarrollo, ejecuta:

bash
Copiar código
npm run dev
La aplicación estará disponible en http://localhost:3000.

# Estructura del Proyecto
La estructura principal del proyecto es la siguiente:

bash
Copiar código
src/
├── assets/         # Archivos estáticos
├── components/     # Componentes reutilizables de Vue
├── views/          # Vistas principales de la aplicación
├── store/          # Gestión del estado con Pinia
├── router/         # Configuración de las rutas de la aplicación
├── App.vue         # Componente raíz de la aplicación
└── main.js         # Punto de entrada de la aplicación
# Dependencias Principales
Las principales dependencias utilizadas en este proyecto son:

Vue.js: Framework principal para la construcción de la interfaz de usuario.
Vue Router: Manejo de la navegación entre vistas.
Pinia: Gestión del estado de la aplicación.
Axios: Cliente HTTP para el consumo de APIs.
Socket.IO: Comunicación en tiempo real con el servidor.
Bootstrap: Framework CSS para el diseño responsivo.
Manejo de Eventos y Estado
La aplicación utiliza Socket.IO para la comunicación en tiempo real con el servidor, permitiendo sincronizar el estado del contador entre diferentes clientes. Pinia se encarga de la gestión del estado global del contador, facilitando su acceso y modificación desde cualquier componente.

# Estilos y Diseño
Bootstrap se emplea para el diseño responsivo de la interfaz. Se han personalizado algunos estilos para adaptarse a las necesidades específicas del proyecto.

# Pruebas
Actualmente, no se han implementado pruebas unitarias o de integración en este proyecto. Se recomienda añadir pruebas en futuras versiones para asegurar la calidad y estabilidad del código.

