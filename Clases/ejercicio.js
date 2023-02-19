function mostrarLista(array) {
    if(array.length === 0) {
        return 'Lista Vacia';
    }

    array.forEach((element) => console.log (element));
    return array.length;
} 

let arrayVacio = [];

let arrayPoblado = [1, 2, 3];

//console.log(mostrarLista(arrayVacio));

console.log(mostrarLista(arrayPoblado));


class Persona {
    constructor(nombre){
        this.nombre = nombre;
    }

    static especie = 'humano'
    saludar = () => {
        console.log(`Hola, mi nombre es ${this.nombre}`)
    };
    getEspecie = () => {
        console.log(`Aunque no lo creas, soy un ${Persona.especie}, como tu`);
    };
}

let persona1 = new Persona('Sofia')
let persona2 = new Persona('Juan Cruz')

persona1.saludar()
persona2.saludar()

persona1.getEspecie()
persona2.getEspecie()



class Contador {
    constructor (nombre) {
        this.nombre = nombre;
        this.contadorIndividual = 0;
    }
    static contadorGlobal = 0;

    obtenerResponsable = () => {
        return this.nombre;
    };

    contar = () => {
        this.contadorIndividual++;
        Contador.contadorGlobal++;
    };

    obtenerContadorIndividual = () => {
        return this.contadorIndividual;
    };

    obtenerContadorGlobal = () => {
        return Contador.contadorGlobal;
    };
}

// Pruebas:

let contador1 = new Contador('Sofia')
let contador2 = new Contador('Juan Cruz')

contador1.contar();
contador1.contar();
console.log(contador1.obtenerContadorIndividual());


contador2.contar();

console.log(contador2.obtenerContadorIndividual());

console.log(contador1.obtenerContadorGlobal());

// ES 8
let animalesVeterinaria = {
    perros: 6,
    gatos: 9,
    aves: 3,
};

let valoresAnimalesVeterinaria = Object.values(animalesVeterinaria);
let cantidadAnimalesTotal = valoresAnimalesVeterinaria.reduce(
    (valorActual, ValorAcumulable) => valorActual + ValorAcumulable

);

console.log(valoresAnimalesVeterinaria);
console.log(cantidadAnimalesTotal);

// ES 9

const objetos = [
    {
        manzanas: 3,
        peras: 2,
        carne: 1,
        jugos: 5,
        dulces: 2,
    },
    {
        manzanas: 1,
        sandias: 1,
        huevos: 6,
        jugos: 1,
        panes: 4,
    },
];

let arregloProductos = [];

objetos.forEach((objeto) => {
    const keys = Object.keys(objeto);

    keys.forEach((key) =>{
        if (!arregloProductos.includes(key)) arregloProductos.push(key);
    });

});


console.log(arregloProductos);
