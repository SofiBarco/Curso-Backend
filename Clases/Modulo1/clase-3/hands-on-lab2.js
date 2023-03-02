const suma = (numero1, numero2) => {
  return new Promise((resolve, reject) => {
    if (numero1 === 0 || numero2 === 0) reject('Operacion innecesaria')
    if(numero1 + numero2 < 0)
    reject('La calculadora solo debe devolver positivos');
    
    resolve(numero1 + numero2);
  })  ;
};

const calculos = async () => {
    try {
        let numero1 = 5;
        let numero2 = 3;

        let resultSuma = await suma(numero1, numero2);
        console.log(resultSuma);
    } catch (error) {
        
    }
}

calculos();