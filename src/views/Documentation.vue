<template>
    <div class="container mt-5">
      <h1 class="mb-4">Documentación del Proyecto</h1>
  
      <section class="mb-5">
        <h2>Introducción</h2>
        <p>
          Este proyecto es una aplicación Vue.js diseñada para contar manualmente el número de personas. Utiliza Vue Router para la navegación, Axios para el consumo de API, Pinia para la gestión del estado, Socket.IO para la comunicación con el servidor y Bootstrap para el diseño de la interfaz de usuario. 
        </p>
      </section>
  
      <section class="mb-5">
        <h2>Estructura del Proyecto</h2>
        <p>
          La estructura principal del proyecto es la siguiente:
        </p>
        <ul>
          <li><strong>src/</strong>: Carpeta principal del código fuente.</li>
          <li><strong>components/</strong>: Componentes reutilizables de Vue.</li>
          <li><strong>views/</strong>: Vistas principales de la aplicación.</li>
          <li><strong>store/</strong>: Gestión del estado utilizando Pinia.</li>
          <li><strong>router/</strong>: Configuración de las rutas de la aplicación.</li>
        </ul>
      </section>
  
      <section class="mb-5">
        <h2>Integración de Dependencias</h2>
        <p>
          Las principales dependencias utilizadas en este proyecto son:
        </p>
        <ul>
          <li><strong>Vue.js</strong>: Framework principal para la construcción de la interfaz de usuario.</li>
          <li><strong>Vue Router</strong>: Manejo de la navegación entre vistas.</li>
          <li><strong>Pinia</strong>: Gestión del estado de la aplicación.</li>
          <li><strong>Socket.IO</strong>: Comunicación en tiempo real con el servidor.</li>
          <li><strong>Bootstrap</strong>: Framework CSS para el diseño responsivo.</li>
        </ul>
      </section>
  
      <section class="mb-5">
        <h2>Funcionalidades Principales</h2>
        <p>
          La aplicación permite:
        </p>
        <ul>
          <li>Incrementar y decrementar manualmente el contador de personas. </li>
          <li>Realizar una petición al servidor con la información requerida, si los datos son correctos, se retorna una respuesta afirmativa, de lo contrario, habrá un error en la solicitud (La respuesta se puede chequear en la consola del navegador al utilizar los botones del navegador).</li>
          <li>Abrir y cerrar la comunicación con el servidor (Se puede chequear en la consola ingresar y salir del componente que posee el contador).</li>
        </ul>
      </section>
  
      <section class="mb-5">
        <h2>Manejo de Eventos y Estado</h2>
        <p>
          Se utiliza Socket.IO para crear eventos personalizados que permitan la comunicación entre componentes y el servidor. Pinia gestiona el estado global del contador, permitiendo su acceso y modificación desde cualquier componente.
        </p>
      </section>
  
      <section class="mb-5">
        <h2>Estilos y Diseño</h2>
        <p>
          Bootstrap se emplea para el diseño responsivo de la interfaz. Se han personalizado algunos estilos para adaptarse a las necesidades específicas del proyecto.
        </p>
      </section>
      
      <section class="mb-5">
      <h2>Manejo de Errores y Validaciones</h2>
      <p>
        La aplicación implementa las siguientes estrategias para el manejo de errores y validaciones:
      </p>
      <ul>
        <li>
          <strong>Manejo de Errores en Solicitudes HTTP:</strong> Al enviar solicitudes al servidor mediante Axios, se implementan bloques <code>try-catch</code> para capturar errores de red o respuestas con códigos de estado HTTP que indiquen fallos. Los mensajes de error se registran en la consola para facilitar la depuración.
        </li>
        <li>
          <strong>Manejo de Errores en Socket.IO:</strong> Se suscriben listeners a eventos como <code>connect_error</code> y <code>disconnect</code> para detectar problemas en la conexión en tiempo real. Se implementan estrategias de reconexión automática y se informa al usuario sobre el estado de la conexión.
        </li>
      </ul>
    </section>

      <section class="mb-5">
      <h2>Configuración Inicial del Proyecto</h2>
      <p>Para instalar las dependencias y ejecutar el proyecto, utiliza los siguientes comandos:</p>
      <pre><code class="language-bash">npm install
npm run dev</code></pre>
    </section>

    <section class="mb-5">
      <h2>Store con <code>Pinia</code> y Solicitudes con <code>Axios</code></h2>
      <p>
        Se utiliza Pinia para gestionar el estado global del contador en la aplicación y Axios para consumir la API del servidor con el payload requerido.
      </p>
      <pre><code class="language-javascript">import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'https://ikcount.com/iklab/ikcount/api/counting/command';
const accessToken = 'ZC5pLm1hcmlubW9yYTpBUElfS0VZQDE1MWJkNDMwM2MwZDFjOGE0Mjg0M2IyNWNhOTQzZDk0MWQyZTRiMWUyMjM2ZDYxYjRkZTdlZTMyNzI3OTRlOWM2MzNmYmE0OTcwNjBlNjUxZWVmZjY3ODQ4NmRjNGZjYzFlZmYyMzY5ZDFiN2JlMmM3ZGMwNTE3ZjY5NGM0MzY0OklLTEFCMDA1';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    async sendCommand(type, quantity) {
      const payload = {
        type,
        quantity,
        client: 'DEMO001',
        location: 'DEMO001A1L1',
        mac_address: 'DEMO001A1L1Z1MC1',
      };

      try {
        const response = await axios.post(`${API_URL}?atoken=${accessToken}`, payload, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.data.cod === 200) {
          console.log(response.data.mssg);
          if (type === 'manual-add') {
            this.count += quantity;
          } else if (type === 'manual-sub') {
            this.count -= quantity;
          }
        } else {
          console.error('Error en la respuesta:', response.data.mssg);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    },
    increment(quantity) {
      this.sendCommand('manual-add', quantity);
    },
    decrement(quantity) {
      this.sendCommand('manual-sub', quantity);
    },
  },
});</code></pre>
    </section>

    <section class="mb-5">
      <h2>Comunicación en Tiempo Real con <code>Socket.IO</code></h2>
      <p>El componente establece una conexión con un servidor mediante Socket.IO para sincronizar el estado del contador en tiempo real:</p>
      <pre><code class="language-javascript">import { io } from 'socket.io-client';

const ACCESS_TOKEN = 'ZC5pLm1hcmlubW9yYTpBUElfS0VZQDE1MWJkNDMwM2MwZDFjOGE0Mjg0M2IyNWNhOTQzZDk0MWQyZTRiMWUyMjM2ZDYxYjRkZTdlZTMyNzI3OTRlOWM2MzNmYmE0OTcwNjBlNjUxZWVmZjY3ODQ4NmRjNGZjYzFlZmYyMzY5ZDFiN2JlMmM3ZGMwNTE3ZjY5NGM0MzY0OklLTEFCMDA1';
const SOCKET_URL = `https://ikcount.com/live?atoken=${ACCESS_TOKEN}`;

const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default socket;</code></pre>
      <p>Se manejan eventos personalizados enviados desde el servidor (WELCOME, RAW, SUMMARY, HEARTBEAT). :</p>
      <pre><code class="language-javascript">const handleSummary = (data) =&gt; {
  if (data &amp;&amp; data.count !== undefined) {
    counterStore.$patch({ count: data.count });
  }
};

onMounted(() =&gt; {
  socket.on('SUMMARY', handleSummary);
});

onUnmounted(() =&gt; {
  socket.off('SUMMARY', handleSummary);
  socket.disconnect();
});</code></pre>
    </section>

    <section class="mb-5">
      <h2>Emisión de Eventos al Servidor con <code>socket.emit</code></h2>
      <p>
        Para enviar eventos personalizados al servidor, se utiliza el método <code>socket.emit</code>. A continuación, se muestra cómo emitir un evento llamado <code>custom-event</code> con un objeto de datos:
      </p>
      <pre><code class="language-javascript">socket.emit('custom-event', {
  key1: 'valor1',
  key2: 'valor2',
});</code></pre>
      <p>
        En el contexto de la aplicación, se utilizan los eventos <code>manual-add</code> y <code>manual-sub</code> para incrementar o decrementar el contador manualmente. Por ejemplo:
      </p>
      <pre><code class="language-javascript">// Para incrementar el contador
socket.emit('manual-add', { quantity: 1 });

// Para decrementar el contador
socket.emit('manual-sub', { quantity: 1 });</code></pre>
    </section>


    <section class="mb-5">
      <h2>Desuscripción de Eventos para Optimizar Recursos</h2>
      <p>
        Para evitar fugas de memoria y optimizar el uso de recursos, es esencial
        desuscribirse de los eventos y cerrar la conexión del socket al desmontar
        el componente.
      </p>
      <pre><code class="language-javascript">onUnmounted(() => {
  socket.off('SUMMARY', handleSummary);
  socket.disconnect();
});</code></pre>
    </section>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
const count = ref(0);

onMounted(() => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightElement(block);
  });
});
</script>

<style scoped>
pre {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
}
</style>