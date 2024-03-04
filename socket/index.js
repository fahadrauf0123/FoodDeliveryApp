import io from 'socket.io-client';
import { socketUrl } from '../env';

const socket = io(socketUrl);
export default socket;