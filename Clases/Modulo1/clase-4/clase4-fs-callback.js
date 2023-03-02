const fs = require ('fs');

fs.writeFile('./ejemplo-callback.txt', 'Hola desde callback', (error) => {
    if (error) return console.log('Error al escribir el archivo');

    fs.readFile('./ejemplo-callback.txt', 'utf-8', (error, resultado) => {
        if (error) return console.log('Error al leer el archivo');
        console.log(resultado);

    
        
    })
})