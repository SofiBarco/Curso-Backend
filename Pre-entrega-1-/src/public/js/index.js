const socket = io();

const listaProd = document.getElementById('log');
const lista = document.getElementById('prodList')

socket.on("products", (products) => {
   

    console.log(products);
    let prodList = "";
    products.forEach((prod) => {
        mostrarProd += `-`+` Product ${prod.title}
        Price ${prod.price}`;
    });

    lista.innerHTML = `${prodList}`
});