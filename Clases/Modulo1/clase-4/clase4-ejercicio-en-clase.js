const fs = require ('fs');

const date = new Date().toString();
fs.writeFile('./almacenar-fecha.txt', date, (error) => {
    if (error) return console.log('Error al crear el archivo');

    fs.readFile('./almacenar-fecha.txt', 'utf-8', (error, resultado) => {
        if (error) return console.log('Error al leer el archivo');
        console.log(resultado);
    })
}) 