const promise = new Promise((resolve, reject) => {
    if(true){
        resolve('Funciono');
    } else {
        reject('Error!');
    }
});

promise
    .then((result) => result + '!')
    .then((result2) => result2 + '?')
    .then((result3) => result3 + '!')
    .catch(() => console.log)



    const dividir = (dividendo, divisor) => {
        return new Promise()
        if(divisor === 0) {
            reject('No se puede dividir entre 0');
        } else {
            resolve (dividendo / divisor)
        }
    }