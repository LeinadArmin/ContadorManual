<template>
  <div class="text-center">
    <h1 class="my-4">Contador Manual de Personas</h1>
    <p class="display-4">{{ count }}</p>
    <div class="btn-group" role="group" aria-label="Controles del contador">
      <button type="button" class="btn btn-success" @click="increment(1)">Incrementar</button>
      <button type="button" class="btn btn-danger" @click="decrement(1)">Decrementar</button>
    </div>
  </div>
  <div class="app-container">
    <!-- Contenido existente de la aplicación -->
    <router-link to="/documentation">
      <button class="btn btn-info documentation-button">
        Ir a la Documentación
      </button>
    </router-link>
  </div>
</template>

<script setup>
import { useCounterStore } from '../store/counterStore';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { io } from 'socket.io-client';

const ACCESS_TOKEN = 'ZC5pLm1hcmlubW9yYTpBUElfS0VZQDE1MWJkNDMwM2MwZDFjOGE0Mjg0M2IyNWNhOTQzZDk0MWQyZTRiMWUyMjM2ZDYxYjRkZTdlZTMyNzI3OTRlOWM2MzNmYmE0OTcwNjBlNjUxZWVmZjY3ODQ4NmRjNGZjYzFlZmYyMzY5ZDFiN2JlMmM3ZGMwNTE3ZjY5NGM0MzY0OklLTEFCMDA1';
const SOCKET_URL = `https://ikcount.com/live?atoken=${ACCESS_TOKEN}`;

const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const counterStore = useCounterStore();
const count = computed(() => counterStore.count);

// Funciones para incrementar y decrementar el contador
const increment = (quantity) => {
  counterStore.increment(quantity);
  // Emitir evento al servidor si es necesario
  socket.emit('manual-add', { quantity });
};

const decrement = (quantity) => {
  counterStore.decrement(quantity);
  // Emitir evento al servidor si es necesario
  socket.emit('manual-sub', { quantity });
};

// Manejo de eventos recibidos desde el servidor
const handleWelcome = (data) => {
  console.log('Bienvenida del servidor:', data);
  // Lógica adicional según sea necesario
};

const handleRaw = (data) => {
  console.log('Datos en bruto del servidor:', data);
  // Lógica adicional según sea necesario
};

const handleSummary = (data) => {
  console.log('Resumen del servidor:', data);
  if (data && data.count !== undefined) {
    counterStore.$patch({ count: data.count });
  }
};

const handleHeartbeat = (data) => {
  console.log('Latido del servidor:', data);
  // Lógica adicional según sea necesario
};

// Suscripción a eventos del servidor al montar el componente
onMounted(() => {
  socket.on('connect', () => {
    console.log('Conectado al servidor Socket.IO');
  });

  socket.on('disconnect', () => {
    console.log('Desconectado del servidor Socket.IO');
  });

  // Suscribirse a eventos personalizados
  socket.on('WELCOME', handleWelcome);
  socket.on('RAW', handleRaw);
  socket.on('SUMMARY', handleSummary);
  socket.on('HEARTBEAT', handleHeartbeat);
});

// Desuscripción de eventos al desmontar el componente
onUnmounted(() => {
  socket.off('WELCOME', handleWelcome);
  socket.off('RAW', handleRaw);
  socket.off('SUMMARY', handleSummary);
  socket.off('HEARTBEAT', handleHeartbeat);

  // Desconectar el socket
  socket.disconnect();
});
</script>

<style scoped>
.documentation-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
</style>