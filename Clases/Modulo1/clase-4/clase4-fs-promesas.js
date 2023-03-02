const fs = require('fs');

const operacionesAsincronas = async () => {
    await fs.promises.writeFile('./ejemplo-promesas.txt', 'Hola desde promesas');

    let resultado = await fs.promises.readFile('./ejemplo-promesas.txt', 'utf-8');
    console.log(resultado);

    await fs.promises.appendFile('./ejemplo-promesas.txt', 'Mas texto');

    resultado = await fs.
}