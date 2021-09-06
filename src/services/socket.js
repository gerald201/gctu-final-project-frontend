import io from 'socket.io-client';
import backendConfig from '@/config/backend';

const socket = io(backendConfig.host, {
  transports: ['websocket']
});

export default socket;
