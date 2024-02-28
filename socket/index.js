import io from 'socket.io-client';
import { backendUrl } from '../env';

const socket = io(backendUrl);
export default socket;