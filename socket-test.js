import { io } from 'socket.io-client';

// Connect to the Socket.IO server
const socket = io('http://localhost:3000', {
	auth: {
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJoZWxsbyIsImlhdCI6MTcyODUwMDExMiwiZXhwIjoxNzI4NTAzNzEyfQ.cssJJ1E8oD2VqsGcIm5xNTUV2-tYeNkH2b_OSvOit7E',
	},
});

// Listen for connection event
socket.on('connect', () => {
	console.log('Connected to server');

	// Join a room
	socket.emit('joinRoom', 'testRoom', (acknowledgment) => {
		console.log('Join room acknowledgment:', acknowledgment);
	});

	// Send a message to the room after joining
	socket.emit('message', 'testRoom', 'Hello from JavaScript client!');
});

// Listen for messages
socket.on('message', (data) => {
	console.log('Received message:', data);
});

// Handle errors
socket.on('connect_error', (err) => {
	console.error('Connection error:', err);
});
