const socket = io();

let listProd = document.getElementById('products');


    socket.on("productAdd", (product) => {
        
        const productHTML = document.createElement("div");
        productHTML.classList.add("gallery");
        productHTML.innerHTML = `<h2>${product.title}</h2> <p>${product.description}</p> <p>$${product.price}</p>`;
        listProd.appendChild(productHTML);
    });
    
    socket.on("productDelete", (productIndex) =>{
        listProd.removeChild(listProd.children[productIndex]);
    });