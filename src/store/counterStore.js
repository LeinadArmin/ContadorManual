import { defineStore } from 'pinia';
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
});
