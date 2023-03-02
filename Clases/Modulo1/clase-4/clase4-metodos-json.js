const numeros = {
    x: 10,
    y: 20,
};

const string = JSON.stringify(numeros);
console.log(string);

const objeto = JSON.parse(string);
console.log(objeto);