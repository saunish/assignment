import { Boot } from './boot/index.js';
function main() {
    Boot.startServer()
        .then(() => console.log('server started'))
        .catch((err) => console.log(err));
}
main();
