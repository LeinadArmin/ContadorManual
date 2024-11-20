import { io } from 'socket.io-client';

const ACCESS_TOKEN = 'ZC5pLm1hcmlubW9yYTpBUElfS0VZQDE1MWJkNDMwM2MwZDFjOGE0Mjg0M2IyNWNhOTQzZDk0MWQyZTRiMWUyMjM2ZDYxYjRkZTdlZTMyNzI3OTRlOWM2MzNmYmE0OTcwNjBlNjUxZWVmZjY3ODQ4NmRjNGZjYzFlZmYyMzY5ZDFiN2JlMmM3ZGMwNTE3ZjY5NGM0MzY0OklLTEFCMDA1';
const SOCKET_URL = `https://ikcount.com/live?atoken=${ACCESS_TOKEN}`;

const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default socket;
