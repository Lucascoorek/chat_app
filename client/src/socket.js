import io from 'socket.io-client';
const socket = io('http://localhost:5000');

export default socket;

export function socket_init() {
  console.log('connected to socket');
}
