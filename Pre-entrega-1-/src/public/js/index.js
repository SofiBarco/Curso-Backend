const socket = io();

const listProd = document.getElementById('productslist');
const imageList = document.getElementById("imageproducts");

    socket.on("products", (products) => {
        const productHTML = products.map((prod) => {
            return `<br>- El producto ${prod.title} con el codigo: ${prod.code}, descripcion: ${prod.description} y precio: ${prod.price}`;
        }).join('');
    
        productList.innerHTML = productHTML;
    
        products.thumbnails.forEach((image) => {
            const imageElem = document.createElement("img");
            imageElem.src = image;
            imageElem.alt = products.title;
            imageList.appendChild(imageElem);
        });
    });