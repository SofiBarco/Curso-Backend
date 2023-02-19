

//let nuevosValores = valoresOriginales.map((element)=> element + 1);

//funcion map
let valoresOriginales = [1, 2, 3, 4, 5];
const miFuncionMap = (arreglo, callback) => {
    let nuevoArreglo = [];
    for(let i=0; i < arreglo.lenght; i++){
        let nuevoValor = callback(arreglo[i]);
       nuevoArreglo.push(nuevoValor); 
    }
    
    return nuevoArreglo;
}

let nuevoArregloPropio = miFuncionMap(valoresOriginales, (x) => x * 2);
let nuevoArregloConMap = valoresOriginales.map((element) => element * 2);

console.log(nuevoArregloPropio);
console.log(nuevoArregloConMap);



const sumar = (numero1, numero2) => numero1 + numero2;
const restar = (numero1, numero2) => numero1 - numero2;
const multiplicar = (numero1, numero2) => numero1 * numero2;
const dividir = (numero1, numero2) => numero1 / numero2;

const realizarOperacion = (numero1, numero2, callback) => {
    let resultado = callback(numero1, numero2);

    console.log(
        `EL resultado de la operacion q me pediste es: ${resultado}`
    );
};

realizarOperacion(2, 4, sumar);
realizarOperacion(6, 3, restar);
realizarOperacion(5, 6, multiplicar);
realizarOperacion(10, 2, dividir);