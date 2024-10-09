import { Boot } from './boot/index.js';

function main() {
	Boot.startServer()
		.then(() => console.log('server started'))
		.catch((err: Error) => console.log(err));
}

main();
